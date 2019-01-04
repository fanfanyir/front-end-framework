import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionType'

const defaultState = {
  inputValue: 'to',
  list: [
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
  ]
}

// reducer 可以接收 state, 但是绝对不能修改 state
// 纯函数指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用。eg. new Date()  就不是纯函数     改变了输入的值的话就算是有副作用
export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  
  if(action.type === CHANGE_INPUT_VALUE) {
    newState.inputValue = action.value;
    return newState;      // f返回给了 store，store去更新自己的数据
  }
  if(action.type === ADD_TODO_ITEM){
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;
  }
  if(action.type === DELETE_TODO_ITEM){
    newState.list.splice(action.index, 1);
    return newState;
  }  
  if(action.type === INIT_LIST_ACTION){
    newState.list = action.data;
    return newState;
  }
  // console.log(state, action)
  return state;
}