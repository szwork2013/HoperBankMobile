import fetch from 'isomorphic-fetch'
import API from '../api'
export const FETCH_TEAM = 'FETCH_TEAM'
export const FETCH_TEAMLIST = 'FETCH_TEAMLIST'
export const CLEAR_TEAMLIST = 'CLEAR_TEAMLIST'
export const FETCH_ROYALTYLIST ='FETCH_ROYALTYLIST'


/*获取团队数据*/
export function fetchTeam(userId,callback){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'POST',
            url:API.myteam.preview,
            data: {
                userId: userId
            },
            dataType:'json',
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_TEAM,
                        response:data.info
                    })
                    callback && callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}
export function fetchTeamList(opt){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'POST',
            url:API.myteam.teamList,
            data:{
                userId:opt.userId,
                type:opt.type,
                curPage:opt.curPage
            },
            dataType:"json",
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_TEAMLIST,
                        response:getState().team.teamList.concat(data.info.list)
                    })
                    opt.callback && opt.callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
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
export function fetchRoyaltyList(userId,year,callback){
    return (dispatch, getState) => {
        return $.ajax({
            type: 'POST',
            url:API.myteam.royaltyList,
            data:{
                userId:userId,
                year:year
            },
            dataType:"json",
            success: function(data){
                if(data.r==1){
                    dispatch({
                        type:FETCH_ROYALTYLIST,
                        response:data.list
                    })
                    callback && callback(data);
                }

            },
            error: function(xhr, type){
                console.log(xhr)
            }
        });
    }
}