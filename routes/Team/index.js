import TeamListPage from './components/TeamListPage'
import RoyaltyList from './components/RoyaltyList'
import Auth from 'utils/auth'
module.exports = {
    onEnter:(nextState, replace)=>{
          if(!Auth.logged()){
              replace({
                  pathname: '/login',
                  query: { backUrl: location.pathname }
              })
          }
    },
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
