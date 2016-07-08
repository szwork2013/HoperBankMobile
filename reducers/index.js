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

var accountState = {
  "account":{
    "balance":cookie.get('balance'),
    "bankCard":cookie.get('bankCard'),
    "freezeMoney":cookie.get('freezeMoney'),
    "idCard":cookie.get('idCard'),
    "invest":cookie.get('invest'),
    "mobile":cookie.get('mobile'),
    "name":cookie.get('name'),
    "principalMoney":cookie.get('principalMoney'),
    "totalIncome":cookie.get('totalIncome'),
    "userId":cookie.get('userId')
  }
};
var emptyState = {
  "account":{
    "balance":"",
    "bankCard":"",
    "freezeMoney":"",
    "idCard":"",
    "invest":"",
    "mobile":"",
    "name":"",
    "principalMoney":"",
    "totalIncome":"",
    "userId":""
  }
}

function account(state=accountState,action){
  const { type } = action;
  if (type === ActionTypes.FETCH_ACCOUNT || type === ActionTypes.DO_LOGIN) {
    if (action.response) {
      console.log(action.response)
      return action.response
    }

  }
  if(type === ActionTypes.DO_LOGOUT){
    return emptyState
  }

  return state
}

function product(state={type1:[],type2:[],type3:[]},action){
  const { type } = action;
  if (type === ActionTypes.FETCH_LCLIST) {
    if (action.response) {
      state.type1 = action.response;
      return state
    }
  }
  if (type === ActionTypes.FETCH_FWLIST) {
    if (action.response) {
      state.type2 = action.response;
      return state
    }
  }

  return state
}


const rootReducer = combineReducers({
  routing,
  index,
  account,
  product
})

export default rootReducer
