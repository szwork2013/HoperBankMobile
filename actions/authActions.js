import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from '../utils/auth'
export const FETCH_ACCOUNT =  'FETCH_ACCOUNT'
export const DO_LOGIN =  'DO_LOGIN'
export const DO_LOGOUT =  'DO_LOGOUT'
const USER_ID = Auth.getItem('userId');

export function fetchAccount(id,callback){
    return (dispatch, getState) => {
        return fetch(API.user.account + `?userId=${USER_ID}`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data.r==1){
                    data.account.fullMobile= Auth.getItem('fullMobile');
                    Auth.login(data.account,()=>{
                        dispatch({
                            type:FETCH_ACCOUNT,
                            response:data.account
                        })
                    })
                }
                callback && callback(data);
            }).catch(function(error) {
                console.log('fetchAccount request failed', error)
            })
    }
}
export function doLogin(username,password,callback){
    return (dispatch, getState) => {
        return fetch(`${API.login}?mobile=${username}&passwd=${password}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    res.account.fullMobile=username;
                    Auth.login(res.account,()=>{
                        dispatch({
                            type:DO_LOGIN,
                            response:res.account
                        })
                    })
                }
                callback && callback(res);
            })
    }
}
export function doLogout(){
    Auth.logout()
    return {
        type:DO_LOGOUT,
        response:null
    }
}


/*注册-步骤一 -> 手机是否被注册 */
/*不需要存入store*/
export function registerFirstStep(phoneNumber,callback){
    var url = API.regedit.step1
    return (dispatch, getState) => {
        return fetch(`${url}?mobile=${phoneNumber}`)
            .then((res)=>res.json())
            .then((res)=>{
                callback && callback(res);
            })
    }
}
/*注册-步骤二 -> 获取验证码 */
/*不需要存入store*/
export function registerSecondStep(phoneNumber,callback){
    var url = API.regedit.step2
    return (dispatch, getState) => {
        return fetch(`${url}?mobile=${phoneNumber}`)
            .then((res)=>res.json())
            .then((res)=>{
                callback && callback(res);
            })
    }
}
/*注册-步骤三 -> 发送表单 */
/*不需要存入store*/
export function registerThirdStep(opt){
    var url = API.regedit.step3
    return (dispatch, getState) => {
        return fetch(`${url}?mobile=${opt.mobile}&passwd=${opt.password}&code=${opt.code}&referrerName=${opt.referrerName}`)
            .then((res)=>res.json())
            .then((res)=>{
                opt.callback && opt.callback(res);
            })
    }
}

/*重置密码*/
/*不用保存在store中*/
export function resetPassWord(opt){
    var url=API.reset.password;
    return (dispatch, getState) => {
        return fetch(url+`?userId=${USER_ID}&newpasswd=${opt.newpasswd}&type=${opt.type}&oldpasswd=${opt.oldpasswd}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}

/*忘记密码第一步：发送短信验证码*/
/*不用保存在store中*/
export function forgotPassWordStep1(opt){
    var url=API.forget.password.step1;
    return (dispatch, getState) => {
        return fetch(url+`?mobile=${opt.mobile}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}
/*忘记密码第二步：获取重置密码权限，发送手机号和手机验证码*/
/*不用保存在store中*/
export function forgotPassWordStep2(opt){
    var url=API.forget.password.step2;
    return (dispatch, getState) => {
        return fetch(url+`?mobile=${opt.mobile}&smsCode=${opt.smsCode}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}
/*忘记密码第三步：重置密码，发送手机号，新密码，重置密码权限码*/
/*不用保存在store中*/
export function forgotPassWordStep3(opt){
    var url=API.forget.password.step3;
    return (dispatch, getState) => {
        return fetch(url+`?mobile=${opt.mobile}&passwd=${opt.passwd}&resCode=${opt.resCode}`)
            .then((response)=>response.json())
            .then((data)=>{
                opt.callback && opt.callback(data)
            })
    }
}