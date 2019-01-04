import React,{ Component } from 'react';
import PropTypes  from 'prop-types';

class List extends Component {
    
    render(){
        const list = this.props.data
        console.log(list)
        return (
            // const { content } = this.props;
            // content 等价于 this.props.content
            //
            <ul>
                {this.getTodoItem(list)}
            </ul>
        )
    }
   
    // // 当这个组件即将被从页面中剔除的时候，会被执行
    // componentWillUnmount(){
    //     // console.log("list componentWillUnmount")
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextProps.data,this.props.data)
    //     if(nextProps.data !== this.props.data){
    //         return true
    //     }else {
    //         return false
    //     }
    // }

    getTodoItem(list){
        return list.map((item, index) => {
            return <li 
                        key={item} 
                        // index={index}
                        onClick={this.handleDelete.bind(this,index)}
                        dangerouslySetInnerHTML={{__html: item}}
                     
                    >
                     {/* 不转义，直接以 ’h1’ 形式显示出来 */}
                    {/* {this.props.test}-{item} */}
                    </li>
        })
    }

    handleDelete(index){
        const deleteTitle = this.props.deleteTitle
        deleteTitle(index)
    }
}


List.propTypes = {
    deleteTitle: PropTypes.func,
    test: PropTypes.string.isRequired,
    // list: PropTypes.arrayOf(PropTypes.number,PropTypes.string)      // 数组的组成 是 number 或者 string
    // list: PropTypes.oneOfType([PropTypes.number,PropTypes.string] )      // list 是 number 或者 string
}

List.defaultProps = {
    test: 'hello world'
}
export default List