import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function index(state=null,action){
  const { type } = action;
  if (type === ActionTypes.FETCH_INDEX) {
    if (action.response) {
      console.log(action.response)
      return action.response
    }
  }
  return state
}
function account(state=null,action){
  const { type } = action;
  if (type === ActionTypes.FETCH_ACCOUNT) {
    if (action.response) {
      console.log(action.response)
      return action.response
    }
  }

  return state
}


const rootReducer = combineReducers({
  routing,
  index,
  account
})

export default rootReducer
