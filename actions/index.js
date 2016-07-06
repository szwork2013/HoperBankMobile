import 'isomorphic-fetch'
import API from '../api'
export const FETCH_INDEX =  'FETCH_INDEX'
export const FETCH_ACCOUNT =  'FETCH_ACCOUNT'
export const DO_LOGIN =  'DO_LOGIN'
export const DO_LOGOUT =  'DO_LOGOUT'
export function loadIndex(){
  return (dispatch, getState) => {
    return $.ajax({
      type: 'GET',
      url: API.index,
      data: {},
      timeout:15000,
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
            response:data
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
            response:data
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