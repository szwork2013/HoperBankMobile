import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import API from '../api'

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
    "balance":cookie.get('balance') || 0,
    "bankCard":cookie.get('bankCard') || '',
    "freezeMoney":cookie.get('freezeMoney') || '',
    "idCard":cookie.get('idCard') || '',
    "invest":cookie.get('invest') || '',
    "mobile":cookie.get('mobile') || '',
    "name":cookie.get('name') || '',
    "fullMobile":cookie.get('fullMobile') || '',
    "principalMoney":cookie.get('principalMoney') || '',
    "totalIncome":cookie.get('totalIncome') || '',
    "userId":cookie.get('userId') || ''
};
var emptyState = {
    "balance":"",
    "bankCard":"",
    "freezeMoney":"",
    "idCard":"",
    "invest":"",
    "mobile":"",
    "fullMobile":'',
    "name":"",
    "principalMoney":"",
    "totalIncome":"",
    "userId":""
}

function account(state=accountState,action){
  const { type } = action;
  if (type === ActionTypes.FETCH_ACCOUNT || type === ActionTypes.DO_LOGIN) {
    if (action.response) {
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

/*理财产品reducer*/
function productType1(state=[],action){
    const { type } = action;
    if( type == ActionTypes.FETCH_LCLIST){
        return action.response
    }
    return state
}
/*优选服务reducer*/
function productType2(state=[],action){
    const { type } = action;
    if( type == ActionTypes.FETCH_FWLIST){
        return action.response
    }
    if( type == ActionTypes.CLEAR_PRODUCT){
        return []
    }
    return state
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
function teamList(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_TEAMLIST:
            return action.response
            break;
        case ActionTypes.CLEAR_TEAMLIST:
            return []
            break;
    }
    return state;
}
function royaltyList(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_ROYALTYLIST:
            return action.response
            break;
    }
    return state;
}
function dealRecord(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_DEALRECORD:
            return action.response
            break;
        case ActionTypes.CLEAR_DEALRECORD:
            return []
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

/*产品投标记录*/
/* 优选与理财、债权共用，每次请求完全替掉该state*/
function financialInvestRecord(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_FINANCIAL_INVEST_RECORD:
            return action.response
            break;
        case ActionTypes.CLEAR_FINANCIAL_INVEST_RECORD:
            return []
            break;
    }
    return state;
}

/* 优选服务-单个详情获取 */
function fetchFinancialServices(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_FINANCIAL_SERVICES:
            return action.response
            break;
    }
    return state;
}

/*项目详情--回款计划记录*/
function financialReturnPlan(state=[],action){
    const {type} = action;
    switch (type){
        case ActionTypes.FETCH_FINANCIAL_RETURN_PLAN:
            return action.response
            break;
        case ActionTypes.CLEAR_FINANCIAL_RETURN_PLAN:
            return []
            break;
    }
    return state;
}


/*富友充值提现接口*/
function fuiouURI(state=API.fuiouURI){
    return state;
}

/*活动列表*/
function activity(state=[],action){
    const {type} = action;
    if(type==ActionTypes.FETCH_ACTIVITY_LIST){
        return action.response
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

//借款产品列表
const borrowProductListData=[
    {
        name:'保单贷',
        amt:'1-50万元',
        expires:'12-36个月',
        rate:'2.38%',
        type:1
    },
    {
        name:'车主贷',
        amt:'1-30万元',
        expires:'12-36个月',
        rate:'2.58%',
        type:2
    },
    {
        name:'悦楼工薪贷',
        amt:'1-15万元',
        expires:'12-36个月',
        rate:'2.58%-2.78%',
        type:7
    },
    {
        name:'悦楼生意贷',
        amt:'1-15万元',
        expires:'12-36个月',
        rate:'2.58%-2.78%',
        type:8
    },
    {
        name:'消费精英贷',
        amt:'1-50万元',
        expires:'12-36个月',
        rate:'1.98%-2.58%',
        type:4
    },
    {
        name:'消费薪金贷',
        amt:'1-50万元',
        expires:'12-36个月',
        rate:'1.98%-2.58%',
        type:1
    },
    {
        name:'生意贷',
        amt:'1-50万元',
        expires:'12-36个月',
        rate:'2.78%',
        type:6
    },
    {
        name:'社保贷',
        amt:'1-50万元',
        expires:'12-36个月',
        rate:'2.58%',
        type:5
    }
];
function borrowProductList(state=borrowProductListData,action){
    const {type} = action;
    return state;
}

const rootReducer = combineReducers({
  routing,
  index,
  account,
    fuiouURI,
    activity,
  product:combineReducers({
      type1:productType1,
      type2:productType2,
      investRecord:financialInvestRecord,
      productDetail:fetchFinancialServices,
      returnPlan:financialReturnPlan,
      borrowProductList
  }),
  isFetching,
  team:combineReducers({
      preview:team,
      teamList,
      royaltyList
  }),
    user:combineReducers({
        dealRecord,
        investRecord,
        investRecordShouldUpdate:setInvestRecordShouldUpdate,
        returnPlanRecord,
        gift:combineReducers({
            preview:myGift,
            list:myGiftList
        })
    }),
    form:formReducer
})

export default rootReducer
