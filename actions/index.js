import 'isomorphic-fetch'
import API from '../api'
export const FETCH_INDEX =  'FETCH_INDEX'
export const FETCH_ACCOUNT =  'FETCH_ACCOUNT'
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
        callback && callback(data);
        dispatch({
          type:FETCH_ACCOUNT,
          response:data
        })
      },
      error: function(xhr, type){
        console.log(xhr)
      }
    });
  }
}