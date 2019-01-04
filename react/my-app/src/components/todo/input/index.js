import React, {Component, Fragment} from 'react';
import PropTypes  from 'prop-types';
import Test from '../test.js'

class Input extends Component {
    constructor(props){
        super(props)
        // 当组件的 state 或者 props 发生改变的时候， render 函数就会重新执行
        this.state = {
            title: ''
        }
        this.changeHandle = this.changeHandle.bind(this)
        this.clickHandle = this.clickHandle.bind(this)
    }

    // render(){
    //     return (
    //         <div>
    //             <input value={this.state.title} onChange={this.changeHandle.bind(this)}/>
    //             <button onClick={this.clickHandle.bind(this)}>发送</button>
    //         </div>
    //     )
    // }

    // //在组件即将被挂载到页面的时候自动执行
    // componentWillMount(){
    //     console.log("input componentWillMount")
    // }

    //  //在组件被挂载到页面之后，自动执行
    //  componentDidMount(){
    //     console.log("input componentDidMount")
    // }

    render(){
        return (
            <Fragment>
                {/* */}
                {
                    // 单行注释
                }
                <label htmlFor="insertArea">输入内容：</label>
                <input 
                    id="insertArea"
                    className='input'
                    value={this.state.title} 
                    onChange={this.changeHandle}/>
                <button onClick={this.clickHandle}>发送</button>
                <Test content={this.state.title}></Test>
            </Fragment>
        )
    }
    // // 组件被更新之前，会自动被执行
    // shouldComponentUpdate(){
    //     console.log("input shouldComponentUpdate")
    //     return true
    // }

    // // 组件被更新前执行，但是它在 shouldComponentUpdate 之后执行，shouldComponentUpdate 返回 true 它才会执行。
    // componentWillUpdate(){
    //     console.log("input componentWillUpdate")
    // }

    // // 组件更新完成之后被执行
    // componentDidUpdate(){
    //     console.log("input componentDidUpdate")
    // }

    // // 一个组件要从父组件接受参数
    // // 只要父组件的 render 函数被重新执行了，子组件的这个生命周期函数就会被执行
    // // 如果这个组件第一次存在于父组件中，不会执行
    // // 如果这个组件之前已经存在于父组件中，才会执行
    // componentWillReceiveProps(){
    //     console.log("input componentWillReceiveProps")
    // }

   
    clickHandle(){
        const title = this.state.title

        const addTitle = this.props.addTitle        // 函数
        addTitle(title)     // 将输入的内容放进数组里

        this.setState(() => ({
            title: ''
        }))
    }

    // changeHandle(e){
    //     this.setState({
    //         title: e.target.value
    //     })
    // }
    changeHandle(e){
        const value = e.target.value
        this.setState(() => ({
                title: value
            }))
    }
}

Input.propTypes = {
    addTitle: PropTypes.func.isRequired   //必填，如果没办法传也可以设置默认值---defalutProps
}

export default Input