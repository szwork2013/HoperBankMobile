import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from 'utils/auth'

/*申请借款表单发送，不用通知store*/
export function borrowApply(opt){
    var url=API.borrow.cooperation;
    return (dispatch, getState) => {
        return fetch(`${url}?referrerName=${opt.referrerName}&sex=${opt.sex}&phone=${opt.phone}&province=${opt.province}&city=${opt.city}&company=${opt.company}&money=${opt.money}&cycle=${opt.cycle}`)
            .then((res)=>res.json())
            .then((res)=>{
                opt.callback && opt.callback(res);
            })
    }
}


/*验证身份证，不用通知store*/
export function asyncCheckId(opt){
    var url=API.authentication.certification1;
    return (dispatch, getState) => {
        return fetch(`${url}?userId=${Auth.getUserId()}&name=${opt.name}&pid=${opt.pid}`)
            .then((res)=>res.json())
            .then((res)=>{
                opt.callback && opt.callback(res);
            })
    }
}

/*获取城市列表，不用通知store*/
export function fetchCity(province,cb){
    var url=API.authentication.city;
    return (dispatch, getState) => {
        return fetch(`${url}?provinceName=${province}`)
            .then((res)=>res.json())
            .then((res)=>{
                cb && cb(res);
            })
    }
}