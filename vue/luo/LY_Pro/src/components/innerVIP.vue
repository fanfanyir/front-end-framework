<template>
    <div>
        <h1> 内网VIP申请</h1>
        <apply ref="myApply" @submit="submit" @currentStep="changePage" :parentCurrentStep="defaultPage">
            <!-- 流程图 -->
            <flowChart slot="panel-flow-chart" :flow_name="'demand_innerVIP_apply'" chart_name="内网VIP申请流程图" >

            </flowChart>

            <!-- 操作提示 -->
            <div slot="apply-operate-notify">
                <ul>
                    <li>这是一些操作说明</li>
                </ul>
            </div>

            <!-- 安全提示 -->
            <div slot="apply-safe-notify">
                <ul>
                    <li>这里是一些安全提示</li>
                </ul>
            </div>

            <div slot="selectForm" style="width: 78%">
                <P>请选择VIP类型</P>
                <Form :label-width="0" inline ref="formDynamic" :model="formDynamic" :rules="ruleValidate">
                <RadioGroup v-model="type" vertical>
                    <Tooltip content="云上VIP暂不支持BNS形式，请联系VIP管理员申请" max-width="200">
                    <Radio label="VIP-BNS" size=large disabled>
                        <Icon type="social-apple"></Icon>
                        <span>VIP-BNS</span>
                    </Radio>
                    </Tooltip>
                    <FormItem prop="bns" v-if="this.type === 'VIP-BNS'">
                    <Input v-model="formDynamic.bns"  placeholder="输入BNS" clearable style="width: 400px"></Input>
                    </FormItem>
                        <p></p>
                    <Tooltip content="请优先选择VIP-BNS形式，VIP-RS仅适用于服务不支持bns形式，默认不审批通过，特殊需求先联系VIP管理员" max-width="200">
                        <Radio label="VIP-RS" size=large>
                            <Icon type="social-apple"></Icon>
                            <span>VIP-RS</span>
                        </Radio>
                    </Tooltip>
                    <FormItem v-if="this.type === 'VIP-RS'" style="width:800px" prop="listRs">
                        <Button type="primary" @click="addNewRS">新增RS</Button>
                        <can-edit-table @on-change="updateRS" @on-delete="deleteRS" refs="table2" v-model="formDynamic.listRS" :columns-list="columns2">
                        </can-edit-table>
                    </FormItem>
                </RadioGroup>
                </Form>
            </div>

            <div slot="paramsForm">
                <Card>
                    <p slot="title">
                        <Icon type="md-people"></Icon>
                        基本信息
                    </p>

                    <Form :label-width="100" inline ref="formValidate" :model="formDynamic" :rules="ruleValidate">

                        <FormItem label="部门"  style="width: 280px">
                            <Input v-model="formDynamic.depart.value"  disabled style="width: 100%"></Input>
                        </FormItem>

                        <FormItem label="项目" prop="project" style="width: 300px">
                            <Input v-model="formDynamic.project"   style="width: 100%"></Input>
                        </FormItem>

                        <FormItem label="业务负责人" prop="owner" style="width: 300px">
                            <Select
                                    v-model="formDynamic.owner"
                                    filterable
                                    remote
                                    :remote-method="getUserList"
                                    :loading="loading"
                                    clearable
                            >
                                <Option v-for="(option, index) in userList" :value="option.username" :key="index"
                                >{{option.username+' '+option.departmentName}}
                                </Option>
                            </Select>

                        </FormItem>
                    </Form>
                </Card>

                <Card ref="formDynamic" :model="formDynamic"
                      v-for="(item,index) in formDynamic.item"
                      v-if="item.status"
                      :key=index
                      :prop="'items.'+index+'.value'">
                    <p slot="title">
                        <Icon type="md-cart"></Icon>
                        VIP信息
                    </p>
                    <a href="#" slot="extra" @click="deleteCard(index)">
                        <Icon type="ios-trash-outline" />
                        删除
                    </a>
                    <Form :label-width="100" inline :ref='"listRef"+index' :model="item" :rules="ruleValidate2">
                        <Row>
                            <FormItem label="对外端口" style="width: 300px" prop="outPort">
                                <Input v-model="item.outPort" placeholder="对外端口号"
                                       style="width: 50px" number></Input>
                            </FormItem>

                            <FormItem label="对内端口" style="width: 300px" prop="innerPort">
                                <Input v-model="item.innerPort" placeholder="对内端口号"
                                       style="width: 50px" number></Input>
                            </FormItem>
                            <FormItem label="截止时间" style="width:30%" prop="deadline">
                                <DatePicker type="datetime" v-model="item.deadline2" @on-change="(e,t) =>{setDeadline(e,t,index)}" format="yyyy-MM-dd HH:mm:ss" :start-data="new Date(2018,10,10)" ></DatePicker>
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem label="通报邮箱" style="width:300px" prop="email">
                                <Input v-model="item.email" placeholder="邮箱地址"
                                       style="width: 200px"></Input>
                            </FormItem>
                            <FormItem label="VIP用户" style="width:300px" prop="userDesc">
                                <Input v-model="item.userDesc" placeholder="VIP用户描述"
                                       style="width: 200px"></Input>
                            </FormItem>
                            <FormItem v-if="type==='VIP-BNS'" label="BNS" style="width:30%">
                                {{formDynamic.bns}}
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem label="协议" style="width: 300px" prop="protocol">
                                <Select v-model="item.protocol"   @on-change="v=>{changeProtocol(v,index)}" style="width: 80px">
                                    <Option v-for="it in formItem.protocol" :key="it.name" :value="it.value">
                                        {{it.name}}
                                    </Option>
                                </Select>
                            </FormItem>

                            <FormItem label="机房" style="width: 300px" prop="az">
                                <Select v-model="item.az" style="width: 100px">
                                    <Option v-for="it in formItem.az" :key="it.name" :value="it.value">
                                        {{it.name}}
                                    </Option>
                                </Select>
                            </FormItem>

                            <FormItem label="负载均衡策略" style="width: 30%" prop="loadBalance">
                                <Select v-model="item.loadBalance" style="width: 100px">
                                    <Option v-for="it in formItem.loadBalance" :key="it.name" :value="it.value">
                                        {{it.name}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Row>
                        <div v-if="item.showUDPChecker" style="width:100%">
                            <FormItem label="UDP校验" style="width:100%" prop="UDPChecker">
                                <Input v-model="item.UDPChecker" placeholder="UDP校验字段"
                                       style="width: 500px"></Input>
                            </FormItem>
                        </div>

                        <FormItem v-if="type==='VIP-BNS'" label="RS列表" style="width: 50%">
                            <Table :columns="columns1" :data="rsList"></Table>
                        </FormItem>

                        <FormItem v-else-if="type ==='VIP-RS'" label="RS列表" style="width: 50%">
                            <Table :columns="columns1" :data="formDynamic.listRS"></Table>
                        </FormItem>


                        <FormItem label="申请原因" style="width: 800px" prop="applyReason">
                            <Input v-model="item.applyReason" type="textarea" :autosize="{minRows: 4,maxRows: 5}"
                                   placeholder="请详细描述申请原因"></Input>
                        </FormItem>
                    </Form>
                </Card>
                <Form :label-width="80" >
                    <Button type="success" style="margin: 8px" @click="addCard">VIP添加端口</Button>
                </Form>
            </div>

                <!--信息确认及提交-->
            <div slot="confirmPage">
                <p slot="title">
                    申请信息预览
                </p>
                <Collapse v-model="openPanel">
                    <Panel name="1">
                        基本信息
                        <div slot="content">
                            <Row>
                                <Col span="8">
                                    申请部门: <b>{{formDynamic.depart.value}}</b>
                                </Col>
                                <Col span="8">
                                    项目组: <b>{{formDynamic.project}}</b>
                                </Col>
                                <Col span="8">
                                    负责人: <b>{{formDynamic.owner}}</b>
                                </Col>
                            </Row>
                        </div>
                    </Panel>
                    <Panel ref="formDynamic" :model="formDynamic"
                           v-for="(item,index) in formDynamic.item"
                           v-if="item.status"
                           name="2"
                           :key=index
                           :prop="'items.'+index+'.value'">
                        VIP信息
                        <div slot="content">
                            <Row>
                                <Col span="8">
                                    外部端口: <b>{{item.outPort}}</b>
                                </Col>
                                <Col span="8">
                                    内部端口：<b>{{item.innerPort}}</b>
                                </Col>
                                <Col span="8">
                                    端口截止时间：<b>{{item.deadline}}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col v-if="type==='VIP-BNS'" span="8">
                                    BNS: <b>{{formDynamic.bns}}</b>
                                </Col>
                                <Col span="8">
                                    通报邮箱: <b>{{item.email}}</b>
                                </Col>
                                <Col span="8">
                                    VIP用户: <b>{{item.userDesc}}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    协议： <b>{{item.protocol}}</b>
                                </Col>
                                <Col span="8">
                                    机房： <b>{{getNameByValue(item.az,formItem.az)}}</b>
                                </Col>
                                <Col span="8">
                                    轮询策略： <b>{{getNameByValue(item.loadBalance,formItem.loadBalance)}}</b>
                                </Col>

                            </Row>
                            <Row v-if="item.showUDPChecker">
                                <Col span="15">
                                    UDP校验: <b>{{item.UDPChecker}}</b>
                                </Col>
                            </Row>
                            <Row>
                                申请理由： <b>{{item.applyReason}}</b>
                            </Row>
                            <Table v-if="type==='VIP-BNS'" :columns="columns1" :data="rsList"></Table>
                            <Table v-if="type==='VIP-RS'" :columns="columns1" :data="formDynamic.listRS"></Table>
                        </div>
                    </Panel>
                </Collapse>
            </div>
            <div slot="stepButton">
                <Button v-if="buttonShow('last')" type="info" @click="changePage(-1)">上一步</Button>
                <Button v-if="buttonShow('next')" type="primary"  @click="changePage(1)">{{nextButtonText}}</Button>
                <Button v-if="buttonShow('submit')" type="success" @click="submit()">{{submitText}}</Button>
            </div>
        </apply>
    </div>
</template>

<script>
    import apply from '@/main_components/apply/apply2'
    import flowChart from '@/main_components/apply/flow_chart'
    import canEditTable from '@/main_components/tables/canEditTable'
    import {forEach} from '../../../libs/tools'
    import {ApplyInnerVIPBNS} from '@/api/demands'
    import {ResubmitInnerVIPBNS} from '@/api/demands'
    import {EditInnerVIPBNS} from '@/api/demands'
    import {ApplyInnerVIPRS} from '@/api/demands'
    import {ResubmitInnerVIPRS} from '@/api/demands'
    import {EditInnerVIPRS} from '@/api/demands'
    import {getInstanceByName} from "@/api/resource"
    import {getResourceByID} from "@/api/resource"
    import store from '@/store';
    import {mapMutations} from 'vuex'
    import {getUserInfoByPrefix,getUserDepart} from '@/api/user'

    import {getFormItem, getDeparts, getNameByValue} from '@/libs/common'
    import {userList} from '../../../api/user'
    import Cookies from 'js-cookie';

    export default {
        name: 'resource',
        components: {
            apply,
            flowChart,
            canEditTable,
            forEach
        },
        data () {
            const validatePort = (rule, value, callback) => {
                if (value === '') {
                    callback();
                } else if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字'));
                } else {
                    if (value < 1 || value > 65535) {
                        callback(new Error('端口范围为1-65535'));
                    } else {
                        callback();
                    }
                }
            };
            const validateNumber = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('字段不能为空'));
                } else if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字'));
                } else {
                    if (value < 1) {
                        callback(new Error('数字小于1'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                //submitType: 0-申请，1-发单人重提交，2-审批人编辑
                submitType: 0,

                resubmit: false,
                flowInstanceId:0,

                loading: false,
                userList: [],

                openPanel:[1,2,3],
                currentStep: 0,
                stepCount: 4,
                nextButtonText: '已阅读完申请须知,下一步',
                defaultPage: this.getDefaultPage(),
                submitText: '提交',
                allowNext: true,
                bns:'',
                rs:'',
                type:'VIP-RS',
                valueRS:'',
                listRS:[],
                depart: 1,
                business: '',
                owner: '',
                applyInfo:'',
                rsList: [
                    {
                        rs: 'todo:根据bns获取rs列表'
                    }
                ],
                loadBalanceMap : {
                    "wrr": "加权轮询",
                    "mincoon": "最小连接数",
                    "srch": "源地址哈希"
                },
                ruleValidate: {
                    depart: [
                        {type: 'number',required: true, message: '部门不能为空', trigger: 'change'},
                    ],
                    project: [
                        {required: true, message: '项目不能为空', trigger: 'change'},
                    ],
                    owner: [
                        {required: true, message: '业务负责人不能为空', trigger: 'change'}
                    ],
                    bns: [
                        {required: true, message: 'BNS不能为空', trigger: 'change'}
                    ],
                    rsList: [
                        {required: true, message: 'RS不能为空', trigger: 'change'}
                    ]
                },
                ruleValidate2: {
                    outPort: [
                        {required: true,validator: validatePort, trigger: 'blur'}
                    ],
                    innerPort: [
                        {required: true,validator: validatePort, trigger: 'blur'}
                    ],
                    deadline: [
                        {required: true, message: '截止时间不能为空', trigger: 'blur'}
                    ],
                    userDesc: [
                        {required: true, message: '用户描述不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '通报邮箱不能为空', trigger: 'blur'},
                        { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                    ],
                    protocol: [
                        {required: true, message: '协议不能为空', trigger: 'blur'}
                    ],
                    az: [
                        {required: true, message: '机房不能为空', trigger: 'blur'}
                    ],
                    loadBalance: [
                        {required: true, message: '负载均衡不能为空', trigger: 'blur'}
                    ],
                    UDPChecker: [
                        {required: true, message: 'udp校验不能为空', trigger: 'blur'}
                    ],
                    applyReason: [
                        {required: true, message: '申请原因不能为空',trigger: 'blur'},
                        { type: 'string', min: 20, message: '申请理由至少20个字', trigger: 'blur' }
                    ],

                },
                columns1: [
                    {
                        title:'RS列表',
                        key: 'rs',
                        align: 'center'
                    }
                ],
                columns2: [
                    {
                        title: 'RS列表',
                        align: 'center',
                        key: 'rs',
                        width: 600,
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 200,
                        key: 'handle',
                        handle: ['edit', 'delete']
                    }

                ],


                formItem: {
                    loadBalance: [
                        {
                            name: '加权轮询',
                            value: 'wrr'
                        },
                        {
                            name: '最小连接数',
                            value: 'mincoon'
                        },
                        {
                            name: '源地址哈希',
                            value: 'srch'
                        }
                    ],
                    az: [
                        {
                            name: '华北-保定',
                            value: 'HB-BD',
                        }
                    ],
                    protocol: [
                        {
                            name: 'tcp',
                            value: 'tcp'
                        },
                        {
                            name: 'udp',
                            value: 'udp'
                        }
                    ],

                    depart: "",
                    business: [
                        {
                            name: '理财',
                            value: 'licai'
                        },
                        {
                            name: '信贷',
                            value: 'xindai'
                        },
                        {
                            name: '支付',
                            value: 'zhifu'
                        },
                        {
                            name: 'HQ',
                            value: 'HQ'
                        },

                    ],
                },
                //vip信息
                index:1,
                formDynamic:{
                    owner:'',
                    depart:'',
                    bussiness: '',
                    project:'',
                    bns:'',
                    rs:'',
                    type:'VIP-BNS',
                    rsList: [
                        // {
                        //     rs: 'todo:根据bns获取rs列表'
                        // }
                    ],
                    listRS:[],
                    listRSBK:[],
                    listRSID:[],

                    item: [
                        {
                            status: 1,
                            index: 1,
                            outPort:80,
                            deadline:'',
                            deadline2:'',
                            bns: '',
                            userDesc:'',
                            email: '',
                            innerPort:0,
                            az:'HB-BD',
                            protocol: 'tcp',
                            UDPChecker:'',
                            showUDPChecker:false,
                            applyReason:'',
                            loadBalance:'wrr',
                            rsList:[],
                        },
                    ],
                    itemsResubmit: [],
                },
            }
        },
        mounted() {
            this.formApplyInfo()
        },
        watch: {
            defaultPage: {
                handler (newName, oldName) {
                    // 如果当前页从0-1 那么就去获取初始化表单的信息
                    if (oldName === 0 && newName === 1) {
                        this.initForm()
                    }
                }
            },
            formDynamic: {
                handler (newName, oldName) {
                    if (oldName) {
                        // this.formValid()
                    }
                },
                immediate: true,
                deep: true
            },
            'formDynamic.listRS': {
                handler (newName, oldName) {
                    if (oldName) {
                        // this.formValid()
                    }
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            initForm () {
                // 初始化表单数据
                getUserDepart().then(
                    res => {
                        this.formDynamic.depart = {"key":res["departmentId"]+"","value":res["departmentName"]}
                    }
                )
            },
            buttonShow (button) {
                // 非第一页 才显示上一页按钮
                if (this.defaultPage > 0 && button === 'last') {
                    return true
                }
                // 非最后一页 显示下一页按钮
                if (this.defaultPage !== 3 && button === 'next') {
                    return true
                }
                // 显示提交按钮
                return this.defaultPage === 3 && button === 'submit'

            },
            getDefaultPage () {
                if (store.state.apply.applyType === 'demand_innerVIP_apply') {
                    return 1
                }
                return 0
            },
            ...mapMutations(['clearApply']),
            getFormItem (key) {
                return store.state.apply.formItems[key]
            },
            // 根据用户前缀获取用户
            getUserList (value) {
                if (value) {
                    getUserInfoByPrefix(value).then(
                        res => {
                            this.userList = res.data
                        }
                    )
                }
            },
            formApplyInfo() {
                if(store.state.apply.applyType ==='demand_innerVIP_apply') {
                    this.applyInfo = store.state.apply.applyInfo
                    this.formDynamic.owner = this.applyInfo.owner
                    this.formDynamic.project = this.applyInfo.project
                    let args = JSON.parse(this.applyInfo.operationArgs)
                    this.index = 0
                    this.type = this.applyInfo.demandSubType
                    for (let oneVIP=0;oneVIP < args.length; oneVIP++) {
                        getResourceByID(args[oneVIP][0].rsList).then(res => {
                            var rsForm = []
                            var rsID = []
                            for (let instance of res.data) {
                                rsForm.push({rs: instance.instance_name})
                                rsID.push(instance.instance_id)
                            }
                            this.formDynamic.listRSID = rsID
                            this.formDynamic.listRS = rsForm
                            this.formDynamic.listRSBK = rsForm

                        })
                        for (let i=0; i< args[oneVIP].length; i++) {
                            let one = {
                                status: 1,
                                index: i + 1,
                                protocol: args[oneVIP][i].protocol,
                                deadline: args[oneVIP][i].deadline,
                                deadline2: args[oneVIP][i].deadline,
                                outPort: args[oneVIP][i].outerPort,
                                innerPort: args[oneVIP][i].innerPort,
                                userDesc: args[oneVIP][i].userDesc,
                                UDPChecker: args[oneVIP][i].UDPchecker,
                                loadBalance: args[oneVIP][i].loadBalance,
                                email: args[oneVIP][i].email,
                                az: args[oneVIP][i].az,
                                applyReason: args[oneVIP][i].applyReason
                            }
                            if (this.type === 'VIP-BNS') {
                                this.formDynamic.bns = args[oneVIP][i].bns
                                one['bns'] = this.formDynamic.bns
                            }
                            if (args[oneVIP][i].protocol === 'udp') {
                                one['showUDPChecker'] = true
                            } else {
                                one['showUDPChecker'] = false
                            }

                            this.formDynamic.itemsResubmit.push(one)
                            this.index++
                        }

                    }
                    this.formDynamic.item = this.formDynamic.itemsResubmit
                    this.allowNext = true
                    this.submitType = store.state.apply.submitType
                    this.flowInstanceId = store.state.apply.flowInstanceId
                    this.initForm()
                    // this.changePage(1)

                }
            },
            getNameByValue (value, items) {
                //     通过value 获取name
                let name
                forEach(items, function (item) {
                    if (item.value === value) {
                        name = item.name
                    }
                })
                return name
            },
            changeProtocol(value, index) {
                if (value === 'tcp') {
                    this.formDynamic.item[index].showUDPChecker = false;
                } else {
                    this.formDynamic.item[index].showUDPChecker = true;
                }
            },
            updateRS(tableData, index) {
                getInstanceByName([tableData[index].rs]).then(res =>{
                    if (res.data.length === 0) {
                        this.$Message.error("RS名称不存在")
                        this.formDynamic.listRS = this.formDynamic.listRSBK
                    } else {
                        this.formDynamic.listRSBK = this.formDynamic.listRS
                        this.formDynamic.listRSID[index] = res.data[0].instance_id
                    }
                })

            },
            deleteRS(tableData, index) {
                this.formDynamic.listRSID.splice(index,1)

            },

            addNewRS() {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.valueRS,
                                autofocus: true,
                                placeholder: '请输入实例名称'
                            },
                            on: {
                                input: (val) => {
                                    this.valueRS = val;
                                }
                            }
                        })
                    },
                    onOk:() =>{
                        if (this.valueRS === '') {
                            return
                        }
                        let rs = this.valueRS
                        getInstanceByName([rs]).then(res =>{
                            if (res.data.length === 0) {
                                this.$Message.error("RS名称不存在")
                            } else {
                                this.formDynamic.listRS.push({rs:rs})
                                this.formDynamic.listRSBK = this.formDynamic.listRS
                                this.formDynamic.listRSID.push(res.data[0].instance_id)
                            }
                        })
                        this.valueRS = ''
                    }
                })
            },
            checkSubmit() {
                let newArr = [];
                let _self = this;
                let canNext = true;
                let validCnt = 0;
                for (let index in this.formDynamic.item) {
                    if (this.formDynamic.item[index].status === 0) {
                        continue
                    }
                    validCnt++;
                    let name = 'listRef' + index
                    _self.$refs[name][0].validate((valid) => {
                        if (valid) {
                        } else {
                            canNext = false;
                        }
                    })

                }
                if (validCnt === 0) {
                    return false;
                }
                return canNext;
            },
            checkType() {
                let canNext = true
                if (this.type === "VIP-BNS" && this.formDynamic.bns !== "") {
                    return true
                }
                if (this.type === "VIP-RS" && this.formDynamic.listRS.length > 0) {
                    return true
                }
                this.$Message.error("BNS或RS列表为空")
                return false
            },
            //  如果重新写了 Step 和 applyContent 等，那么关于step的方法也得重写
            changePage (page) {
                let canNext = true
                if ((this.defaultPage + page)===3){
                    //  如果是填参数的页面，那么 验证一下要提交的表单
                    this.$refs['formValidate'].validate((valid) => {
                        if (valid) {
                            canNext = this.checkSubmit()
                        } else {
                            this.$Message.error('请检查表单');
                            canNext = false
                        }
                    })

                }
                if ((this.defaultPage + page)===2) {
                    canNext = this.checkType()
                }
                if (canNext) {
                    this.defaultPage += page
                    this.$refs.myApply.currentStep += page
                    switch (this.defaultPage) {
                        case 0 : {
                            this.nextButtonText = '已阅读内网申请步骤,下一步'
                            break
                        }
                        case 1 : {
                            this.nextButtonText = '已选择好操作类型,下一步'
                            break
                        }
                        case 2 : {
                            this.nextButtonText = '已按照规范填写VIP信息,下一步'
                            break
                        }
                    }
                }
            },
            submit() {
                let departmentID = parseInt(this.formDynamic.depart.key)
                let owner = this.formDynamic.owner
                let project = this.formDynamic.project
                let oneVIPDetail = [];
                let VIPDetail = [];
                let vipPortList = [];
                for (let item of this.formDynamic.item) {
                    if (item.status === 0) {
                        continue
                    }
                    let oneVIP = {
                        email: item.email,
                        az: item.az,
                        outerPort: Number(item.outPort),
                        innerPort: Number(item.innerPort),
                        protocol: item.protocol,
                        deadline: item.deadline,
                        UDPChecker: item.UDPChecker,
                        loadBalance: item.loadBalance,
                        userDesc: item.userDesc,
                        applyReason: item.applyReason,
                    };
                    if (this.type === 'VIP-BNS') {
                        oneVIP['bns'] = this.formDynamic.bns
                    } else {
                        oneVIP['rsList'] = this.formDynamic.listRSID
                    }

                    for (let i=0;i<vipPortList.length;i++) {
                        if (vipPortList[i] === oneVIP.outerPort) {
                            this.$Message.error("对外端口重复")
                            return
                        }
                    }
                    vipPortList.push(oneVIP.outerPort)
                    oneVIPDetail.push(oneVIP);
                }
                // 前端默认只支持单VIP，多端口，后端可支持多vip多端口，因此此处object多一层
                VIPDetail.push(oneVIPDetail);
                let flowInstanceID = this.flowInstanceId
                if (this.type === 'VIP-BNS') {
                    if (this.submitType === 0) {
                        ApplyInnerVIPBNS({departmentID, owner, project,VIPDetail}).then(res =>{
                            if (res.errno === 0) {
                                this.$Message.success("发单成功")
                                window.location.href="/config/flow_manager"
                            } else {
                                this.$Message.error("发单失败：" + res.errmsg)
                            }
                        })
                    } else if (this.submitType === 1) {
                        ResubmitInnerVIPBNS({departmentID, owner, project, VIPDetail, flowInstanceID}).then(res =>{
                            if (res.errno === 0) {
                                this.$Message.success("发单成功")
                                window.location.href="/config/flow_manager"
                            } else {
                                this.$Message.error("发单失败：" + res.errmsg)
                            }
                        })
                    } else {
                        EditInnerVIPBNS({departmentID, owner, project, VIPDetail, flowInstanceID}).then(res =>{
                            if (res.errno === 0) {
                                this.$Message.success("发单成功")
                                window.location.href="/config/flow_manager"
                            } else {
                                this.$Message.error("发单失败：" + res.errmsg)
                            }
                        })
                    }

                } else {
                    if (this.submitType === 0) {
                        ApplyInnerVIPRS({departmentID, owner, project, VIPDetail}).then(res =>{
                            if (res.errno === 0) {
                                this.$Message.success("发单成功")
                                window.location.href="/config/flow_manager"
                            } else {
                                this.$Message.error("发单失败：" + res.errmsg)
                            }
                        })
                    } else if (this.submitType === 1) {
                        ResubmitInnerVIPRS({departmentID, owner, project, VIPDetail, flowInstanceID}).then(res =>{
                            if (res.errno === 0) {
                                this.$Message.success("发单成功")
                                window.location.href="/config/flow_manager"
                            } else {
                                this.$Message.error("发单失败：" + res.errmsg)
                            }
                        })
                        this.clearApply()
                    } else {
                        EditInnerVIPRS({departmentID, owner, project, VIPDetail, flowInstanceID}).then(res =>{
                            if (res.errno === 0) {
                                this.$Message.success("发单成功")
                                window.location.href="/config/flow_manager"
                            } else {
                                this.$Message.error("发单失败：" + res.errmsg)
                            }
                        })
                        this.clearApply()
                    }

                }
            },
            addCard() {
                this.index ++;
                    this.formDynamic.item.push({
                        status: 1,
                        index: this.index,
                        outPort:80,
                        deadline:'',
                        deadline2:'',
                        bns: '',
                        userDesc:'',
                        email: '',
                        innerPort:0,
                        az:'HB-BD',
                        protocol: 'tcp',
                        UDPChecker:'',
                        showUDPChecker:false,
                        applyReason:'',
                        loadBalance:'wrr',
                        rsList:[],
                    })
            },
            deleteCard(index) {
                this.formDynamic.item[index].status = 0
            },
            setDeadline(e, type, index) {
                this.formDynamic.item[index].deadline = e
            },

        }

    }
</script>

<style>

</style>
