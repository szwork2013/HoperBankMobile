import { connect } from 'react-redux'
import {fetchActivityList} from 'actions'
import ActivityPage from './components/ActivityCenter'
module.exports = {
    path: '/activity',
    component:connect((state,ownProps)=>({
        activity:state.activity
    }),{
        fetchActivityList
    })(ActivityPage)
}
