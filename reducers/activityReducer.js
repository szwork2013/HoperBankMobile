
import * as ActionTypes from '../actions/activityActions'

/*活动列表*/
function activity(state=[],action){
    const {type} = action;
    if(type==ActionTypes.FETCH_ACTIVITY_LIST){
        return action.response
    }
    return state;
}

export default activity