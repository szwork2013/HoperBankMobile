import fetch from 'isomorphic-fetch'
import API from '../api'


/*充值操作，不用通知store*/
export function charge(opt){
    var url=API.charge.step1;
    return (dispatch, getState) => {
        return fetch(`${url}?amt=${opt.amt}&userId=${getState().account.userId}`)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.r==1){
                    opt.callback && opt.callback(data);
                }
            })
    }
}

/*提现操作，不用通知store*/
export function withDraw(opt){
    var url=API.withdraw;
    return (dispatch, getState) => {
        return fetch(`${url}?amt=${opt.amt}&userId=${getState().account.userId}`)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.r==1){
                    opt.callback && opt.callback(data);
                }
            })
    }
}