import fetch from 'isomorphic-fetch'
import API from '../api'

export const FETCH_ACTIVITY_LIST = 'FETCH_ACTIVITY_LIST';
/* 活动列表 */
export function fetchActivityList(callback){
    var url=API.activity.list;
    return (dispatch, getState) => {
        return fetch(url)
            .then((response)=>response.json())
            .then((response)=>{
                if(response.r==1){
                    dispatch({
                        type:FETCH_ACTIVITY_LIST,
                        response:response.list
                    })
                }
                callback && callback(response);
            }).catch(function(error) {
                console.log('fetchActivityList request failed', error)
            })
    }
}