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
import TeamListPage from './containers/TeamListPage'
import RoyaltyList from './containers/RoyaltyList'
import NoMatch from './containers/NoMatch'
import DealRecordPage from './containers/DealRecordPage'
import MyInvestmentPage from './containers/MyInvestmentPage'
import ReturnPlanRecordPage from './containers/ReturnedPlanRecordPage'
import InvitationPage from './containers/InvitationPage'
import MyGiftPage from './containers/MyGiftPage'
export default (
  <Route path="/" component={App}>
        <IndexRoute component={HomePage}  />
        <Route path="/home" component={HomePage} />
        <Route path="/financial" component={FinancialPage} />
        <Route path="/borrow" component={BorrowNavPage}>
        </Route>
        <Route path="/my" component={MyPage}>
                <Route path="/my/personal" component={PersonalPage} />
                <Route path="/my/dealrecord" component={DealRecordPage} />
                <Route path="/my/investmentrecord" component={MyInvestmentPage} />
                <Route path="/my/returnPlanRecordPage" component={ReturnPlanRecordPage} />
                <Route path="/my/invitation" component={InvitationPage} />
                <Route path="/my/myGift" component={MyGiftPage} />
        </Route>
        <Route path="/myteam(/:userId)" component={TeamPage}>
                <Route path="/myteam(/:userId)/teamlist" component={TeamListPage}>

                </Route>
                <Route path="/myteam(/:userId)/royaltylist" component={RoyaltyList}>

                </Route>
        </Route>
        <Route path="/login" component={LoginPage}>

        </Route>
        <Route path="*" component={NoMatch}/>
  </Route>
)
