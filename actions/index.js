import 'isomorphic-fetch'
import API from '../api'
export const FETCH_INDEX =  'FETCH_INDEX'
export const FETCH_ACCOUNT =  'FETCH_ACCOUNT'
export const FETCH_LCLIST = 'FETCH_LCLIST'
export const FETCH_FWLIST = 'FETCH_FWLIST'
export const DO_LOGIN =  'DO_LOGIN'
export const DO_LOGOUT =  'DO_LOGOUT'
export const CLEAR_PRODUCT =  'CLEAR_PRODUCT'
export const SET_FETCHING = 'SET_FETCHING'
export const FETCH_TEAM = 'FETCH_TEAM'
export const FETCH_TEAMLIST = 'FETCH_TEAMLIST'
export const CLEAR_TEAMLIST = 'CLEAR_TEAMLIST'
export const FETCH_ROYALTYLIST ='FETCH_ROYALTYLIST'
export const FETCH_DEALRECORD = 'FETCH_DEALRECORD'
export const CLEAR_DEALRECORD = 'CLEAR_DEALRECORD'
export const CLEAR_INVESTRECORD = 'CLEAR_INVESTRECORD';
export const FETCH_INVESTRECORD = 'FETCH_INVESTRECORD';
export const FETCH_RETURNPLANRECORD = 'FETCH_RETURNPLANRECORD'
export const CLEAR_RETURNPLANRECORD = 'CLEAR_RETURNPLANRECORD';
export const FETCH_GIFT = 'FETCH_GIFT';
export const FETCH_GIFT_LIST = 'FETCH_GIFT_LIST';
export const FETCH_FINANCIAL_INVEST_RECORD = 'FETCH_FINANCIAL_INVEST_RECORD'
export const CLEAR_FINANCIAL_INVEST_RECORD = 'CLEAR_FINANCIAL_INVEST_RECORD'
export const FETCH_FINANCIAL_SERVICES = 'FETCH_FINANCIAL_SERVICES'
export const FETCH_FINANCIAL_RETURN_PLAN = 'FETCH_FINANCIAL_RETURN_PLAN'
export const CLEAR_FINANCIAL_RETURN_PLAN = 'CLEAR_FINANCIAL_RETURN_PLAN'
export const FETCH_ACTIVITY_LIST = 'FETCH_ACTIVITY_LIST';
export function loadIndex(){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url: API.index,
            data: {},
            timeout:10000,
            dataType:"jsonp",
            jsonpCallback:'loadIndex',
            success: function(data){
                dispatch({
                    type:FETCH_INDEX,
                    response:data
                })
            },
            error: function(xhr, type){
                console.log(xhr)
                alert('网络状况不佳')
            }
        });
    }
}
export function fetchAccount(id,callback){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url: API.user.account,
            data: {
                userId:id
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchAccountJsonp',
            success: function(data){
                if(data.r==1){
                    data.account.fullMobile=cookie.get('fullMobile');
                    setCookie(data.account)
                    dispatch({
                        type:FETCH_ACCOUNT,
                        response:data.account
                    })
                }
                callback && callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
export function doLogin(username,password,callback){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url: API.login,
            data: {
                mobile:username,
                passwd:password
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'jsonp',
            success: function(data){

                if(data.r==1){
                    data.account.fullMobile=username;
                    setCookie(data.account);
                    dispatch({
                        type:DO_LOGIN,
                        response:data.account
                    })
                }
                callback && callback(data);

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
export function doLogout(){
    cookie.empty();
    return {
        type:DO_LOGOUT,
        response:null
    }
}
function setCookie(data){
    cookie.set({
        "balance":data.balance,
        "bankCard":data.bankCard,
        "freezeMoney":data.freezeMoney,
        "idCard":data.idCard,
        "invest":data.invest,
        "mobile":data.mobile,
        'fullMobile':data.fullMobile || cookie.get('fullMobile'),
        "name":data.name,
        "principalMoney":data.principalMoney,
        "totalIncome":data.totalIncome,
        "userId":data.userId
    })
}


/*理财*/
export function fetchLCList(callback){
    return (dispatch, getState) => {
        $.ajax({
            type: 'GET',
            url: API.product.list,
            data: {
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchLCListJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_LCLIST,
                        response:data.list || null
                    })
                    callback && callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
export function setFetching(b){
    return (dispatch, getState) => {
        dispatch({
            type:SET_FETCHING,
            response:b
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
        return $.ajax({
            type: 'GET',
            url:url,
            data: {
                curPage:opt.curPage || 1,
                orderby:opt.orderBy || 1
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchFWListJsonp',
            success: function(data){
                var oldArr = getState().product.type2;
                if(data.r==1){
                    dispatch({
                        type:FETCH_FWLIST,
                        response:oldArr.concat(data.list)
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

/*获取团队数据*/
export function fetchTeam(userId,callback){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:API.myteam.preview,
            data: {
                userId: userId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchTeamJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_TEAM,
                        response:data.info
                    })
                    callback && callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
export function fetchTeamList(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:API.myteam.teamList,
            data:{
                userId:opt.userId,
                type:opt.type,
                curPage:opt.curPage
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchTeamListJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_TEAMLIST,
                        response:getState().team.teamList.concat(data.info.list)
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
export function clearTeamList(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_TEAMLIST
        })
    }
}

/* 提成列表获取 */
export function fetchRoyaltyList(userId,year,callback){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:API.myteam.royaltyList,
            data:{
                userId:userId,
                year:year
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchRoyaltyListJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_ROYALTYLIST,
                        response:data.list
                    })
                    callback && callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}


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
            type: 'GET',
            url:API.user.dealrecord,
            data:{
                userId:opt.userId,
                type:opt.type,
                curPage:opt.curPage
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchDealRecordJsonp',
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
            type: 'GET',
            url:API.user.investmentrecord,
            data:{
                userId:opt.userId,
                status:opt.type,
                curPage:opt.curPage
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchInvestRecordJsonp',
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
            type: 'GET',
            url:API.user.returnedPlan,
            data:{
                userId:opt.userId,
                status:opt.type,
                curPage:opt.curPage
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchReturnPlanRecordJsonp',
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
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                curPage:opt.curPage,
                projectId:opt.projectId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchFinancialInvestRecord',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_FINANCIAL_INVEST_RECORD,
                        response:getState().product.investRecord.concat(data.list)
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
        console.log(url)
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                userId:opt.userId,
                productId:opt.productId,
                amt:opt.amt
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'payForProductJsonp',
            success: function(data){
                if(data.r==1){
                    opt.success && opt.success({
                        status:data.r,
                        message:data.msg
                    })
                }else{
                    opt.fail && opt.fail({
                        status:data.r,
                        message:data.msg
                    })
                }
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
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
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                projectId:opt.projectId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchFinancialServices',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_FINANCIAL_SERVICES,
                        response:data.productInfo
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
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                curPage:opt.curPage,
                projectId:opt.projectId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchFinancialReturnPlanJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_FINANCIAL_RETURN_PLAN,
                        response:getState().product.returnPlan.concat(data.list)
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
/* 产品详情投资记录删除 */
export function clearFinancialReturnPlan(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_FINANCIAL_RETURN_PLAN
        })
    }
}


/*充值操作，不用通知store*/
export function charge(opt){
    var url=API.charge.step1;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                amt:opt.amt,
                userId:getState().account.userId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'chargeJsonp',
            success: function(data){
                if(data.r==1){
                    opt.callback && opt.callback(data);
                }
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/*提现操作，不用通知store*/
export function withDraw(opt){
    var url=API.withdraw;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                amt:opt.amt,
                userId:getState().account.userId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'chargeJsonp',
            success: function(data){
                if(data.r==1){
                    opt.callback && opt.callback(data);
                }
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/*注册-步骤一 -> 手机是否被注册 */
/*不需要存入store*/
export function registerFirstStep(phoneNumber,callback){
    var url = API.regedit.step1
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                mobile:phoneNumber
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'registerFirstStepJsonp',
            success: function(data){
                callback && callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
/*注册-步骤二 -> 获取验证码 */
/*不需要存入store*/
export function registerSecondStep(phoneNumber,callback){
    var url = API.regedit.step2
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                mobile:phoneNumber
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'registerSecondStepJsonp',
            success: function(data){
                callback && callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
/*注册-步骤三 -> 发送表单 */
/*不需要存入store*/
export function registerThirdStep(opt){
    var url = API.regedit.step3
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                mobile:opt.mobile,
                passwd:opt.password,
                code:opt.code,
                referrerName:opt.referrerName
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'registerThirdStepJsonp',
            success: function(data){
                opt.callback && opt.callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}

/* 活动列表 */
export function fetchActivityList(callback){
    var url=API.activity.list;
        return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'fetchActivityListJsonp',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_ACTIVITY_LIST,
                        response:data.list
                    })
                }
                callback && callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}