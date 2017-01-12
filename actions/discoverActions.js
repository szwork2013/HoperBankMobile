import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from 'utils/auth'


export const FETCH_TEMP_RECORD = 'FETCH_TEMP_RECORD'
export const CLEAR_TEMP_RECORD = 'CLEAR_TEMP_RECORD'
export const FETCH_TEMP_RECORD_DETAIL = 'FETCH_TEMP_RECORD_DETAIL'


/* 交易记录 */
/*清除*/
export function clearTempRecord(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_TEMP_RECORD
        })
    }
}
/*获取*/
export function fetchTempRecord(opt){
    return (dispatch, getState) => {
        //return fetch(API.media+`?typeId=${opt.type}&page=${opt.curPage}`)
        var url = ''
        if(opt.type==1){
            url=API.media.list
        }
        if(opt.type==2){
            url=API.knowledge.list
        }
        return fetch(url+`?curPage=${opt.curPage}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_TEMP_RECORD,
                        response:getState().tempRecord.list.concat(res.list)
                    })
                    opt.callback && opt.callback(res);
                }
            })
            .catch(err => {
                console.log(err)
                //handle your server defined error?
            })
    }
}
export function fetchTempRecordDetail(opt){
    return (dispatch, getState) => {
        //return fetch(API.media+`?typeId=${opt.type}&page=${opt.curPage}`)
        var url = ''
        if(opt.type==1){
            url=API.media.detail
        }
        if(opt.type==2){
            url=API.knowledge.detail
        }

        return $.ajax({
            url:url+`?id=${opt.id}`,

            success:(res)=>{
                dispatch({
                    type:FETCH_TEMP_RECORD_DETAIL,
                    response:res
                })
                opt.callback && opt.callback(res);
                if(res.r==1){
                    dispatch({
                        type:FETCH_TEMP_RECORD_DETAIL,
                        response:res
                    })
                    opt.callback && opt.callback(res);
                }
            }
        })

        /*return fetch(url+`?id=${opt.id}`,{
            method: "POST"
        })
            .then((res)=>{
                console.log(res.text())
                return res.json()
            })
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_TEMP_RECORD_DETAIL,
                        response:res
                    })
                    opt.callback && opt.callback(res);
                }
            })
            .catch(err => {
                console.log(err)
                //handle your server defined error?
            })*/
    }
}