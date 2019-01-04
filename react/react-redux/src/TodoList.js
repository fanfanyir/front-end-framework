import React from 'react';
import { connect } from 'react-redux';
import { getChangeAction, handleClick, deleteItem } from './store/actionCreator';

const TodoList = (props) => {
  const { inputValue, handleClick, deleteItem, changeInputValue, list } = props;
    return (
      <div>
        <div>
          <input value={inputValue} onChange={changeInputValue}/>
          <button onClick={handleClick}>提交</button>
        </div>
        <ul>
          {
            list.map((item,index) => {
              return <li key={index} onClick={() => {deleteItem(index)}}>{item}</li>
            })
          }
        </ul>
      </div>
    )
}

//  把 store 里面的 state 映射到这个组件的 props
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

// store.dispatch, props
const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e){
      const action = getChangeAction(e.target.value);
      dispatch(action)
    },
    handleClick(){
      const action = handleClick();
      dispatch(action)
    },
    deleteItem(index){
      const action = deleteItem(index);
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);