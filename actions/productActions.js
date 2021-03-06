import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from 'utils/auth'
export const FETCH_LCLIST = 'FETCH_LCLIST'
export const FETCH_FWLIST = 'FETCH_FWLIST'
export const CLEAR_PRODUCT =  'CLEAR_PRODUCT'
export const FETCH_FINANCIAL_INVEST_RECORD = 'FETCH_FINANCIAL_INVEST_RECORD'
export const CLEAR_FINANCIAL_INVEST_RECORD = 'CLEAR_FINANCIAL_INVEST_RECORD'
export const FETCH_FINANCIAL_SERVICES = 'FETCH_FINANCIAL_SERVICES'
export const FETCH_FINANCIAL_RETURN_PLAN = 'FETCH_FINANCIAL_RETURN_PLAN'
export const CLEAR_FINANCIAL_RETURN_PLAN = 'CLEAR_FINANCIAL_RETURN_PLAN'

/*理财*/
export function fetchLCList(callback){
    return (dispatch, getState) => {
        fetch(API.product.list)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.r==1){
                    dispatch({
                        type:FETCH_LCLIST,
                        response:data.list || null
                    })
                    callback && callback(data);
                }
            })
    }
}
export function clearProduct(type){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_PRODUCT,
            response:type
        })
    }
}
export function fetchFWList(opt){
    var url = '';
    switch(parseInt(opt.type)){
        case 9:
            url = API.product.financial.list;
            break;
        case 5:
            url = API.product.transfer.list
            break;
        //no default
    }
    return (dispatch, getState) => {
        return fetch(`${url}?curPage=${opt.curPage || 1}&orderby=${opt.orderBy || 1}`)
            .then((response)=>response.json())
            .then((data)=>{
                var oldArr = getState().product.type2;
                if(data.r==1){
                    dispatch({
                        type:FETCH_FWLIST,
                        response:oldArr.concat(data.list)
                    })
                    opt.callback && opt.callback(data);
                }
            }).catch(function(error) {
                console.log('fetchFWList request failed', error)
            })
    }
}



/* 产品详情投资记录获取 */
export function fetchFinancialInvestRecord(opt){
    var url='';
    switch (parseInt(opt.type)){
        case 1:
            url=API.product.record;
            break;
        case 9:
            url=API.product.financial.record;
            break;
        case 5:
            url=API.product.transfer.record;
            break;
        default:
            url=API.product.record;
            break;
        // no default
    }
    return (dispatch, getState) => {
        return fetch(url + `?curPage=${opt.curPage}&projectId=${opt.projectId}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_FINANCIAL_INVEST_RECORD,
                        response:getState().product.investRecord.concat(res.list)
                    })
                }
                opt.callback && opt.callback(res);
            })
    }
}
/* 产品详情投资记录删除 */
export function clearFinancialInvestRecord(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_FINANCIAL_INVEST_RECORD
        })
    }
}

/*购买产品action，无需通知store*/
export function payForProduct(opt){
    var url='';
    switch (parseInt(opt.type)){
        case 1:
            url=API.product.buy;
            break;
        case 9:
            url=API.product.financial.buy;
            break;
        case 5:
            url=API.product.transfer.buy;
            break;
        // no default
    }
    return (dispatch, getState) => {
        return fetch(url + `?userId=${Auth.getUserId()}&productId=${opt.productId}&amt=${opt.amt}&couponId=${opt.couponId}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    opt.success && opt.success({
                        status:res.r,
                        message:res.msg
                    })
                }else{
                    opt.fail && opt.fail({
                        status:res.r,
                        message:res.msg
                    })
                }
            })
    }
}

/* 优选服务 投资页面资料获取 */
export function fetchFinancialServices(opt){
    var url='';
    switch (parseInt(opt.type)){
        case 9:
            url=API.product.financial.detail;
            break;
        case 5:
            url=API.product.transfer.detail;
            break;
        default:
            url=API.product.financial.detail;
            break;

    }
    return (dispatch, getState) => {
        return fetch(url + `?projectId=${opt.projectId}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_FINANCIAL_SERVICES,
                        response:res.productInfo
                    })
                    opt.callback && opt.callback(res);
                }
            })
    }
}

/* 产品详情还款计划获取 */
export function fetchFinancialReturnPlan(opt){
    var url='';
    switch (parseInt(opt.type)){
        case 9:
            url=API.product.financial.findRepaymentPlan;
            break;
        case 5:
            url=API.product.transfer.findRepaymentPlan;
            break;
        default:
            url=API.product.financial.findRepaymentPlan;
            break;

    }
    return (dispatch, getState) => {
        return fetch(url + `?curPage=${opt.curPage}&projectId=${opt.projectId}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_FINANCIAL_RETURN_PLAN,
                        response:getState().product.returnPlan.concat(res.list)
                    })
                    opt.callback && opt.callback(res);
                }
            })
    }
}
/* 产品详情投资记录删除 */
export function clearFinancialReturnPlan(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_FINANCIAL_RETURN_PLAN
        })
    }
}

/*投资确认页优惠券获取*/
/*不用保存在store中*/
export function fetchConfirmPageCoupon(opt){
    var url=API.product.confirm;
    return (dispatch, getState) => {
        return fetch(url+`?userId=${Auth.getUserId()}&productId=${opt.productId}&type=${opt.type}&money=${opt.money}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}