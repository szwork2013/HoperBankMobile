import React from 'react'
import { Route,IndexRoute } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import HomePage from './containers/HomePage'
import BorrowNavPage from './containers/BorrowNavPage'
import MyPage from './containers/MyPage'
import LoginPage from './containers/LoginPage'
import RepoPage from './containers/RepoPage'
import PersonalPage from './containers/PersonalPage'
import FinancialPage from './containers/FinancialPage'
import TeamPage from './containers/TeamPage'
import NoMatch from './containers/NoMatch'
export default (
  <Route path="/" component={App}>
        <IndexRoute component={HomePage}  />
        <Route path="/home" component={HomePage} />
        <Route path="/financial" component={FinancialPage} />
        <Route path="/borrow" component={BorrowNavPage}>
        </Route>
        <Route path="/my" component={MyPage}>
              <Route path="/my/personal" component={PersonalPage}></Route>

        </Route>
        <Route path="/myteam(/:userId)" component={TeamPage}></Route>
        <Route path="/login" component={LoginPage}>

        </Route>
        <Route path="*" component={NoMatch}/>
  </Route>
)
