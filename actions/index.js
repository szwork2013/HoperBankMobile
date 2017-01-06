import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from 'utils/auth'
export * from  './productActions'
export * from './authActions'
export * from './teamsActions'
export * from './accountActions'
export * from './myActions'
export * from './activityActions'
export * from './borrowActions'
export * from './discoverActions'
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
    return (dispatch, getState)=>{
        return fetch(`${url}?userId=${Auth.getUserId()}&productId=${opt.productId}&investId=${opt.investId}`)
            .then((res)=>res.json())
            .then((res)=>{
                opt.callback && opt.callback(res);
            })
    }
}


/*续投与取消续投，不用通知store*/
export function reBuyOperation(opt){
    var url=API.product.reBuy;
    return (dispatch, getState) => {
        return fetch(`${url}?userId=${Auth.getUserId()}&productId=${opt.productId}&investId=${opt.investId}&operation=${opt.operation}`)
            .then((res)=>res.json())
            .then((res)=>{
                opt.callback && opt.callback(res);
            })
    }
}


/*问卷调查，不用通知store*/
export function asyncRisk(opt){
    var url=API.question;
    return (dispatch, getState) => {
        return fetch(`${url}?userId=${Auth.getUserId() || ''}&answer=${opt.answer}`)
            .then((res)=>res.json())
            .then((res)=>{
                opt.callback && opt.callback(res);
            })
    }
}

