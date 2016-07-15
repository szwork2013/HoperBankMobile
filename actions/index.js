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