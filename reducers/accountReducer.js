
import * as ActionTypes from '../actions/authActions'

var accountState = {
    "balance":localStorage.balance || '',
    "bankCard":localStorage.bankCard || '',
    "freezeMoney":localStorage.freezeMoney || '',
    "idCard":localStorage.idCard || '',
    "invest":localStorage.invest || '',
    "mobile":localStorage.mobile || '',
    "name":localStorage.name || '',
    "fullMobile":localStorage.fullMobile || '',
    "principalMoney":localStorage.principalMoney || '',
    "totalIncome":localStorage.totalIncome || '',
    "userId":localStorage.userId || '',
    "isBorrower":localStorage.isBorrower || ''
};

function account(state=accountState,action){
    const { type } = action;
    if (type === ActionTypes.FETCH_ACCOUNT || type === ActionTypes.DO_LOGIN) {
        if (action.response) {
            return action.response
        }

    }
    if(type === ActionTypes.DO_LOGOUT){
        return {}
    }
    return state
}

export default account