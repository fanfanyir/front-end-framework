import React, { Component } from 'react';
import 'antd/dist/antd.css'
import store from './store/index.js';
// import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from './store/actionType'
// import { getTodoList } from './store/actionCreators';
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitList } from './store/actionCreators';
// import { initListAction } from './store/actionCreators';
import TodoListUI from './TodoListUI';
import axios from 'axios'

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    store.subscribe(this.handleStoreChange);
  }

  render(){
    return <TodoListUI 
              list={this.state.list}
              inputValue={this.state.inputValue}
              handleInputChange={this.handleInputChange}
              handleBtnClick={this.handleBtnClick}
              deleteListItem={this.deleteListItem}
            />
  }

  componentDidMount(){
    const action = getInitList()
    store.dispatch(action)

    
    // const action = getTodoList();
    // store.dispatch(action);   // 这个时候 action 会被自动执行


    // axios.get('/list.json')
    //   .then((res) => {
    //     const data = res.data;
    //     const action = initListAction(data);
    //     store.dispatch(action);
    //   })
    //   .catch((res) => {
    //     console.log(res)
    //   })
  }

  handleStoreChange(){
    this.setState(store.getState());
  }

  handleInputChange(e){
    // const action = {
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // }
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }

  handleBtnClick(){
    const action = getAddItemAction()
    store.dispatch(action)
  }

  deleteListItem(index){
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
}

export default TodoList;