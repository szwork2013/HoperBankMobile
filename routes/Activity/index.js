import { connect } from 'react-redux'
import {fetchActivityList} from 'actions'

module.exports = {
    path: '/activity',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, connect((state,ownProps)=>({
                activity:state.activity
            }),{
                fetchActivityList
            })(require('./components/ActivityCenter')))
        })
    }
}
