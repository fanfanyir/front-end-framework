<template>
  <div class="taskAllocation">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="id"
        width="120">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="min"
        label="最小值">
      </el-table-column>
      <el-table-column
        prop="max"
        label="最大值">
      </el-table-column>
      <el-table-column
        prop="schedulingFrequency"
        label="调度频率">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="add-task" @click="dialogFormVisible = true; isDisableTaskName = false; updateOrInsert = 'insert'">新增任务</el-button>

    <!-- 新增任务弹出框 -->
    <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
      <el-form :model="addTaskForm" :rules="rules" ref="addTaskForm">
        <el-form-item label="任务名称" :label-width="formLabelWidth" prop="taskName">
          <el-input v-model="addTaskForm.taskName" autocomplete="off" class="dialog-input" :disabled="isDisableTaskName"></el-input>
        </el-form-item>
        <el-form-item label="最小值" :label-width="formLabelWidth" prop="min">
          <el-input v-model="addTaskForm.min" autocomplete="off" class="dialog-input"></el-input>
        </el-form-item>
        <el-form-item label="最大值" :label-width="formLabelWidth" prop="max">
          <el-input v-model="addTaskForm.max" autocomplete="off" class="dialog-input" prop="minAndMaxRule"></el-input>
        </el-form-item>
        <el-form-item label="调度频率" :label-width="formLabelWidth" prop="schedulingFrequency">
          <el-input v-model="addTaskForm.schedulingFrequency" autocomplete="off" class="dialog-input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false; isDisableTaskName = false">取 消</el-button>
        <el-button type="primary" @click="conform(addTaskForm, 'addTaskForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'taskAllocation',
  data () {
    let validateTaskName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('名字不能为空'))
      } else {
        axios.get('http://39.96.47.5:8089/beego/check', {
          params: {
            name: value
          }
        }).then ((res) => {
          callback()
        }).catch (function (err) {
          console.log(err)
        })
      }
    }
    let validateMinAndMaxRule = (rule, value, callback) => {
      var r = /^-?\d+$/
      if (value === '') {
        callback(new Error('最小值不能为空'))
      } else if (!r.test(value)) {
        callback(new Error('只能为整数'))
      } else {
        callback()
      }
    }
    let validateSchedulingFrequency = (rule, value, callback) => {
      var r = /^\d+$/
      if (value === '') {
        callback(new Error('最小值不能为空'))
      } else if (!r.test(value)) {
        callback(new Error('只能为正整数'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      isDisableTaskName: false,
      addTaskForm: {
        taskName: '',
        min: '',
        max: '',
        schedulingFrequency: ''
      },
      updateOrInsert: 'insert',
      formLabelWidth: '120px',
      rules: {
        taskName: [
          { required: true, validator: validateTaskName, trigger: 'blur' }
        ],
        min: [
          { required: true, validator: validateMinAndMaxRule, trigger: 'blur' }
        ],
        max: [
          { required: true, validator: validateMinAndMaxRule, trigger: 'blur' }
        ],
        schedulingFrequency: [
          { required: true, validator: validateSchedulingFrequency, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      this.isDisableTaskName = true
      this.dialogFormVisible = true
      this.updateOrInsert = 'update'
      this.addTaskForm.taskName = row.taskName
      this.addTaskForm.min = row.min
      this.addTaskForm.max = row.max
      this.addTaskForm.schedulingFrequency = row.schedulingFrequency
    },
    handleDelete (index, row) {
      let that = this
      axios.get('http://39.96.47.5:8089/beego/delete', {
        params: {
          id: row.id
        }
      }).then((res) => {
        that.tableData.splice(index, 1)
      }).catch(function (err) {
        console.log(err,'err')
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getTableData () {
      let that = this
        axios.get('http://39.96.47.5:8089/beego/get', {
          params: {}
        }).then((res) => {
          for (let item of res.data.data) {
            let tableItem = {}
            tableItem.id = item.Tid
            tableItem.taskName = item.Name
            tableItem.min = item.Min
            tableItem.max = item.Max
            tableItem.schedulingFrequency = item.Feq
            that.tableData.push(tableItem)
          }
      }).catch(function (err) {
        console.log(err)
      })
    },
    conform (formData, formName) {
      let that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
            axios.get(`http://39.96.47.5:8089/beego/${ that.updateOrInsert }`, {
              params: {
                name: formData.taskName,
                min: formData.min,
                max: formData.max,
                freq: formData.schedulingFrequency
              }
            }).then((res) => {
              let item = res.data.data;
              let tableItem = {}
              tableItem.id = item.Tid
              tableItem.taskName = item.Name
              tableItem.min = item.Min
              tableItem.max = item.Max
              tableItem.schedulingFrequency = item.Feq
              that.tableData.push(tableItem)
              that.dialogFormVisible = false
              that.isDisableTaskName = false
            }).catch(function (err) {
              console.log(err,'err')
            })
        } else {
          return false;
        }
      });
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
  .add-task {
    margin-top: 20px;
    margin-right: 10px;
    float: right;
  }
  .dialog-input {
    width: 200px;
  }
</style>
