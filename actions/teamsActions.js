import fetch from 'isomorphic-fetch'
import API from '../api'
import Auth from 'utils/auth'
export const FETCH_TEAM = 'FETCH_TEAM'
export const FETCH_TEAMLIST = 'FETCH_TEAMLIST'
export const CLEAR_TEAMLIST = 'CLEAR_TEAMLIST'
export const FETCH_ROYALTYLIST ='FETCH_ROYALTYLIST'


/*获取团队数据*/
export function fetchTeam(callback){
    return (dispatch, getState) => {
        return fetch(API.myteam.preview + `?userId=${Auth.getUserId()}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_TEAM,
                        response:res.info
                    })
                    callback && callback(res);
                }
            })
    }
}
export function fetchTeamList(opt){
    return (dispatch, getState) => {
        return fetch(API.myteam.teamList + `?userId=${Auth.getUserId()}&type=${opt.type}&curPage=${opt.curPage}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_TEAMLIST,
                        response:getState().team.teamList.concat(res.info.list)
                    })
                    opt.callback && opt.callback(res);
                }
            })
    }
}
export function clearTeamList(){
    return (dispatch, getState) => {
        dispatch({
            type:CLEAR_TEAMLIST
        })
    }
}

/* 提成列表获取 */
export function fetchRoyaltyList(year,callback){
    return (dispatch, getState) => {
        return fetch(API.myteam.royaltyList + `?userId=${Auth.getUserId()}&year=${year}`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.r==1){
                    dispatch({
                        type:FETCH_ROYALTYLIST,
                        response:res.list
                    })
                    callback && callback(res);
                }
            })
    }
}