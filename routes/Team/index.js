import TeamListPage from './components/TeamListPage'
import RoyaltyList from './components/RoyaltyList'
module.exports = {
    path: '/myteam',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/TeamPage'))
        })
    },
    childRoutes:[
        {
            path:'/myteam/teamlist',
            component:TeamListPage
        },
        {
            path:'/myteam/royaltylist',
            component:RoyaltyList
        }
    ]
}
