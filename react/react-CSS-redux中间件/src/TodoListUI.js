import React from 'react';
import { Input,Button,List } from 'antd';

// 定义一个无状态组件: 性能比较高，只是一个函数，但是普通组件是一个 js 的类，这个类生成的对象里面还会有一些生命周期函数，执行的东西远比函数要多得多。
const TodoListUI = (props) => {
  return (
    <div style={{margin:'10px'}}>
        <div>
          <Input 
            placeholder="todo info" 
            style={{width:'300px',marginRight: '10px'}} 
            value={props.inputValue} 
            onChange={props.handleInputChange}
          />
          <Button type='primary' onClick={props.handleBtnClick}>提交</Button>
        </div>
        <List
          style={{marginTop:'10px',width: '300px'}}
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (<List.Item onClick={() => {props.deleteListItem(index)}}>{item}</List.Item>)}
        />
      </div>
  )
}
export default TodoListUI;