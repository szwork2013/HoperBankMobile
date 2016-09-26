import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from '../utils/auth'


export const FETCH_DEALRECORD = 'FETCH_DEALRECORD'
export const CLEAR_DEALRECORD = 'CLEAR_DEALRECORD'
export const CLEAR_INVESTRECORD = 'CLEAR_INVESTRECORD';
export const FETCH_INVESTRECORD = 'FETCH_INVESTRECORD';
export const FETCH_RETURNPLANRECORD = 'FETCH_RETURNPLANRECORD'
export const CLEAR_RETURNPLANRECORD = 'CLEAR_RETURNPLANRECORD';
export const FETCH_CREDITOR_LIST = 'FETCH_CREDITOR_LIST';
export const FETCH_GIFT = 'FETCH_GIFT';
export const FETCH_GIFT_LIST = 'FETCH_GIFT_LIST';
export const SET_INVEST_RECORD_SHOULD_UPDATE = 'SET_INVEST_RECORD_SHOULD_UPDATE'

/* 交易记录 */
/*清除*/
export function clearDealRecord(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_DEALRECORD
        })
    }
}
/*获取*/
export function fetchDealRecord(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'POST',
            url:API.user.dealrecord,
            data:{
                userId:opt.userId,
                type:opt.type,
                curPage:opt.curPage
            },
            dataType:"json",
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_DEALRECORD,
                        response:getState().user.dealRecord.concat(data.list)
                    })
                    opt.callback && opt.callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}


/* 投资记录 */
/*清除*/
export function clearInvestRecord(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_INVESTRECORD
        })
    }
}
/*获取*/
export function fetchInvestRecord(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'POST',
            url:API.user.investmentrecord,
            data:{
                userId:opt.userId,
                status:opt.type,
                curPage:opt.curPage
            },
            dataType:"json",
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_INVESTRECORD,
                        response:getState().user.investRecord.concat(data.list)
                    })
                    opt.callback && opt.callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}


/* 回款记录 */
/*清除*/
export function clearReturnPlanRecord(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_RETURNPLANRECORD
        })
    }
}
/*获取*/
export function fetchReturnPlanRecord(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'POST',
            url:API.user.returnedPlan,
            data:{
                userId:opt.userId,
                status:opt.type,
                curPage:opt.curPage
            },
            dataType:"jsonp",
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_RETURNPLANRECORD,
                        response:getState().user.returnPlanRecord.concat(data.list)
                    })
                    opt.callback && opt.callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/*查看债权列表*/
export function fetchCreditorlist(opt){
    var url=API.user.creditorlist;
    return (dispatch, getState) => {
        return fetch(url+`?userId=${opt.userId}&investId=${opt.investId}&type=${opt.type}`)
            .then((response)=>response.json())
            .then((data)=>{
                dispatch({
                    type:FETCH_CREDITOR_LIST,
                    response:{
                        type:opt.type,
                        data:data.data
                    }
                })
                opt.callback && opt.callback(data)
            })
    }
}

/*实名认证，不用通知store*/
export function authentication(opt){
    var url=API.authentication.certification2;
    return (dispatch, getState) => {
        return fetch(`${url}?userId=${opt.userId}&name=${opt.name}&pid=${opt.pid}&parentBankId=${opt.parentBankId}&cityId=${opt.cityId}&capAcntNo=${opt.capAcntNo}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}


/*投资确认页优惠券获取*/
/*不用保存在store中*/
export function fetchConfirmPageCoupon(opt){
    var url=API.product.confirm;
    return (dispatch, getState) => {
        return fetch(url+`?userId=${opt.userId}&productId=${opt.productId}&type=${opt.type}&money=${opt.money}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}

/* 我的礼券-一级 */
export function fetchGift(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:API.coupon.preview,
            data:{
                userId:opt.userId,
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchGiftJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_GIFT,
                        response:data.list
                    })
                    opt.callback && opt.callback(data);
                }
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/* 我的礼券-详情 */
export function fetchGiftList(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:API.coupon.detail,
            data:{
                userId:opt.userId,
                type:opt.type,
                couponType:opt.couponType
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchGiftListJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_GIFT_LIST,
                        response:data.list
                    })
                    opt.callback && opt.callback(data);
                }
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/* 这个是设置续投成功与否的方法，是为了让列表页面点进续投页面后选择了续投项目后通知列表页面续投成功了没，成功了就
 * 告诉修改列表页使用的store中的一个是InvestRecordShouldUpdate值变为true，然后列表页接收到新props后判断这个值为true的话就更新当前数据并将
 * 该值再设置回false*/
export function setInvestRecordShouldUpdate(b){
    return (dispatch, getState) => {
        dispatch({
            type:SET_INVEST_RECORD_SHOULD_UPDATE,
            response:b
        })
    }
}