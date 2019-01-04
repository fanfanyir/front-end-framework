import React, {Component} from 'react';
class Text extends Component {
    // 两种理解方式：
    // 当父组件的 render 函数被运行时，它的子组件的 render 都将被重新运行一次
        /* props 发生改变的时候， render 函数也会重新执行 */

    render(){
        return <div>{this.props.content}</div>
    }
}

export default Text;