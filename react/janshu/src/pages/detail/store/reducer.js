import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  title: '',
  content: ''
});

const changedetail = (state, action) => {
  return state.merge({
          title: action.title,
          content: action.content
        });
};

export default (state = defaultState, action) => {
  switch(action.type){
    case constants.CHANGE_DETAIL:
      return changedetail(state, action);
    default :
      return state
  }
}