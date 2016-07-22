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
export function loadIndex(){
  return (dispatch, getState) => {
    return $.ajax({
      type: 'GET',
      url: API.index,
      data: {},
      timeout:10000,
      dataType:"jsonp",
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
export function fetchFWList(opt,callback){
  return (dispatch, getState) => {
    return $.ajax({
      type: 'GET',
      url: API.product.financial.list,
      data: {
        curPage:opt.curPage || 1,
        orderby:opt.orderBy || 1
      },
      timeout:15000,
      dataType:"jsonp",
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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
      jsonpCallback:'jsonp',
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