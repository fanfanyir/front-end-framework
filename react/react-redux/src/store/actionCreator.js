import { CHANGE_INPUT_VALUE, ADD_ITEM, DELETE_ITEM} from './actionType';

export const getChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const handleClick = () => ({
  type: ADD_ITEM
})

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  index
})
