import TeamListPage from './components/TeamListPage'
import RoyaltyList from './components/RoyaltyList'
import Auth from 'utils/auth'
import {fetchTeam,fetchTeamList,clearTeamList,fetchRoyaltyList} from 'actions'
import { connect } from 'react-redux'
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
            cb(null,connect((state,ownProps)=>({
                team:state.team.preview,
                teamList:state.team.teamList,
                royaltyList:state.team.royaltyList
            }),{
                fetchTeam,
                fetchTeamList,
                clearTeamList,
                fetchRoyaltyList
            })(require('./components/TeamPage')))
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
