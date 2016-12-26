import { combineReducers } from 'redux'
import * as ActionTypes from '../actions/productActions'

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
//借款产品列表
const borrowProductListData=[
    {
        name:'保单借',
        amt:'1-20万元',
        expires:'12-36个月',
        rate:'2.38%',
        type:1
    },
    {
        name:'车主借',
        amt:'1-20万元',
        expires:'12-36个月',
        rate:'2.38%',
        type:2
    },
    {
        name:'悦楼借',
        amt:'1-15万元',
        expires:'12-36个月',
        rate:'2.58%-2.78%',
        type:7
    },
    {
        name:'消费借',
        amt:'1-20万元',
        expires:'12-36个月',
        rate:'1.98%-2.58%',
        type:3
    },
    {
        name:'生意借',
        amt:'1-20万元',
        expires:'12-36个月',
        rate:'2.78%',
        type:4
    },
    {
        name:'社保借',
        amt:'1-20万元',
        expires:'12-36个月',
        rate:'2.58%',
        type:5
    }
];
function borrowProductList(state=borrowProductListData,action){
    const {type} = action;
    return state;
}

export default combineReducers({
    type1:productType1,
    type2:productType2,
    investRecord:financialInvestRecord,
    productDetail:fetchFinancialServices,
    returnPlan:financialReturnPlan,
    borrowProductList
})