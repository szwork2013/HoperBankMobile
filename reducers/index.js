import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

function index(state=null,action){
  const { type } = action;
  if (type === ActionTypes.FETCH_INDEX) {
    if (action.response) {
      return action.response
    }
  }
  return state
}

var accountState = {
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
};
var emptyState = {
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
function isFetching(state=false,action){
  const { type } = action;
  if (type === ActionTypes.SET_FETCHING) {
    state=action.response;
  }
  return state;
}

function product(state={type1:[],type2:[],type3:[]},action){
  const { type } = action;
  switch (type){
    case ActionTypes.FETCH_LCLIST:
      state = {
        type1:action.response
      }
          break;
    case ActionTypes.FETCH_FWLIST:
      state = {
        type2:action.response
      }
          break;
    case ActionTypes.CLEAR_PRODUCT:
      state['type'+action.response] = [];
          break;
    //no default
  }
  return state;
}

var initTeamState={
  income:'',
      prevIncome:'',
      sumIncome:'',
      userId:''
}
function team(state=initTeamState,action){
  const { type } = action;
  switch (type){
    case ActionTypes.FETCH_TEAM:
      return action.response
      break;
  }
  return state;
}

const rootReducer = combineReducers({
  routing,
  index,
  account,
  product,
  isFetching,
  team
})

export default rootReducer
