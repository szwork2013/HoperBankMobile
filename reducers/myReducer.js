import { combineReducers } from 'redux'
import * as ActionTypes from '../actions/myActions'

function dealRecord(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_DEALRECORD:
            return action.response;
            break;
        case ActionTypes.CLEAR_DEALRECORD:
            return [];
            break;
    }
    return state;
}

/*投资记录*/
function investRecord(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_INVESTRECORD:
            return action.response
            break;
        case ActionTypes.CLEAR_INVESTRECORD:
            return []
            break;
    }
    return state;
}

/*回款记录*/
function returnPlanRecord(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_RETURNPLANRECORD:
            return action.response
            break;
        case ActionTypes.CLEAR_RETURNPLANRECORD:
            return []
            break;
    }
    return state;
}

/*礼券preview*/
function myGift(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_GIFT:
            return action.response
            break;
    }
    return state;
}
/*礼券list*/
function myGiftList(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_GIFT_LIST:
            return action.response
            break;
    }
    return state;
}
//我的投资-》续投成功后返回来页面是否需要刷新用到的reducer
function setInvestRecordShouldUpdate(state=false,action){
    const {type} = action;
    if(type==ActionTypes.SET_INVEST_RECORD_SHOULD_UPDATE){
        return action.response
    }
    return state;
}


//查看债权列表
const creditorListInitData= {
    type1:[],
    type2:[]
}
function creditorList(state=creditorListInitData,action){
    const {type} = action;
    if(type==ActionTypes.FETCH_CREDITOR_LIST){
        if(action.response.type==1){
            return {
                type1:action.response.data
            }
        }else if (action.response.type==2){
            return {
                type2:action.response.data
            }
        }
    }
    return state;
}

export default combineReducers({
    dealRecord,
    investRecord,
    investRecordShouldUpdate:setInvestRecordShouldUpdate,
    returnPlanRecord,
    creditorList,
    gift:combineReducers({
        preview:myGift,
        list:myGiftList
    })
})