import { combineReducers } from 'redux'
import * as ActionTypes from '../actions/teamsActions'


var initTeamState={
    income:'',
    prevIncome:'',
    sumIncome:'',
    userId:''
}
function team(state=initTeamState,action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_TEAM:
            return action.response
            break;
    }
    return state;
}
function teamList(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_TEAMLIST:
            return action.response
            break;
        case ActionTypes.CLEAR_TEAMLIST:
            return []
            break;
    }
    return state;
}
function royaltyList(state=[],action){
    const { type } = action;
    switch (type){
        case ActionTypes.FETCH_ROYALTYLIST:
            return action.response
            break;
    }
    return state;
}
export default combineReducers({
    preview:team,
    teamList,
    royaltyList
})