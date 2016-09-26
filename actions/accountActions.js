import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from 'utils/auth'
const USER_ID = Auth.getItem('userId');

/*充值操作，不用通知store*/
export function charge(opt){
    var url=API.charge.step1;
    return (dispatch, getState) => {
        return fetch(`${url}?amt=${opt.amt}&userId=${USER_ID}`)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.r==1){
                    opt.callback && opt.callback(data);
                }
            }).catch(function(error) {
                console.log('charge request failed', error)
            })
        
    }
}

/*提现操作，不用通知store*/
export function withDraw(opt){
    var url=API.withdraw;
    return (dispatch, getState) => {
        return fetch(`${url}?amt=${opt.amt}&userId=${USER_ID}`)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.r==1){
                    opt.callback && opt.callback(data);
                }
            }).catch(function(error) {
                console.log('withDraw request failed', error)
            })
    }
}