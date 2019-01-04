import { GET_INIT_LIST,CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionType'
// import axios from 'axios'

export const getInputChangeAction = (value) => ({
      type: CHANGE_INPUT_VALUE,
      value
})

export const getAddItemAction = (value) => ({
  type: ADD_TODO_ITEM,
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
});


export const getInitList = () => ({
  type: GET_INIT_LIST
})
// // 使用了 redx-thunk 之后，我们的 action 返回的就不仅可以是一个对象了，也可以是一个函数
// export const getTodoList = () => {
//   return (dispatch) => {
//     axios.get('/list.json').then((res) => {
//       const data = res.data;
//       const action = initListAction(data);
//       dispatch(action);
//     })
//   }
// }
