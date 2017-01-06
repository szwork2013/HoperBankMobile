import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import API from '../api'
import product from './productReducer'
import team from './teamsReducer'
import myReducer from './myReducer'
import activity from './activityReducer'
import account from './accountReducer'

function index(state=null,action){
    const { type } = action;
    if (type === ActionTypes.FETCH_INDEX) {
        if (action.response) {
            return action.response
        }
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

/*富友充值提现接口*/
function fuiouURI(state=API.fuiouURI){
    return state;
}

/*临时记录*/
function tempRecord(state=[],action){
    const { type } = action;
    if (type === ActionTypes.FETCH_TEMP_RECORD) {
        if (action.response) {
            return action.response
        }
    }else if(type === ActionTypes.CLEAR_TEMP_RECORD) {
        return [];
    }
    return state
}
function tempRecordDetail(state=null,action){
    const { type } = action;
    if (type === ActionTypes.FETCH_TEMP_RECORD_DETAIL) {
        return action.response;
    }
    return state;
}

const rootReducer = combineReducers({
    routing,
    index,
    account,
    fuiouURI,
    activity,
    product,
    isFetching,
    team,
    tempRecord:combineReducers({
        list:tempRecord,
        detail:tempRecordDetail
    }),
    user:myReducer,
    form:formReducer
})

export default rootReducer
