import fetch from 'isomorphic-fetch'
import API from '../api'
export * from  './productActions'
export * from './authActions'
export * from './teamsActions'
export * from './accountActions'
export * from './myActions'
export * from './activityActions'
export * from './borrowActions'

export const FETCH_INDEX =  'FETCH_INDEX'
export const SET_FETCHING = 'SET_FETCHING'


export function loadIndex(){
    return (dispatch, getState) => {
        return fetch(API.index)
            .then((response)=>response.json())
            .then((data)=>{
                dispatch({
                    type:FETCH_INDEX,
                    response:data
                })
            })
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
/*取消投资，不用通知store*/
export function cancelInvest(opt){
    var url=API.product.cancel;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                userId:opt.userId,
                productId:opt.productId,
                investId:opt.investId
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'cancelInvestJsonp',
            success: function(data){
                opt.callback && opt.callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}


/*续投与取消续投，不用通知store*/
export function reBuyOperation(opt){
    var url=API.product.reBuy;
    return (dispatch, getState) => {
        return $.ajax({
            type: 'GET',
            url:url,
            data:{
                userId:opt.userId,
                productId:opt.productId,
                investId:opt.investId,
                operation:opt.operation
            },
            timeout:15000,
            dataType:"jsonp",
            jsonpCallback:'cancelInvestJsonp',
            success: function(data){
                opt.callback && opt.callback(data);
            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}





