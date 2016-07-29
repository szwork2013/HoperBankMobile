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
import MyGiftDetailPage from './containers/MyGiftDetailPage'
import InvestPage1 from './containers/InvestPage1'
import InvestPage2 from './containers/InvestPage2'
import ProductDetail from './containers/FinancialProductDetail'
import FinancialProductRecord from './containers/FinancialProductRecord'
export default (
  <Route path="/" component={App}>
        <IndexRoute component={HomePage}  />
        <Route path="/home" component={HomePage} >
                <Route path="/financial/product1(/:id)" component={InvestPage1}>
                        <Route path="/financial/product1(/:id)/detail" component={()=><ProductDetail type={0} />} />
                        <Route path="/financial/product1(/:id)/record" component={FinancialProductRecord} />
                </Route>
        </Route>
        <Route path="/financial" component={FinancialPage}>
                <Route path="/financial/product1(/:id)" component={InvestPage1}>
                        <Route path="/financial/product1(/:id)/detail" component={()=><ProductDetail type={0} />} />
                        <Route path="/financial/product1(/:id)/record" component={FinancialProductRecord} />
                </Route>
                <Route path="/financial/product2(/:id)" component={InvestPage2}>
                        <Route path="/financial/product2(/:id)/detail" component={()=><ProductDetail type={1} />} />
                        <Route path="/financial/product2(/:id)/record" component={FinancialProductRecord} />
                </Route>
        </Route>
        <Route path="/borrow" component={BorrowNavPage}>
        </Route>
        <Route path="/my" component={MyPage}>
                <Route path="/my/personal" component={PersonalPage} />
                <Route path="/my/dealrecord" component={DealRecordPage} />
                <Route path="/my/investmentrecord" component={MyInvestmentPage} />
                <Route path="/my/returnPlanRecordPage" component={ReturnPlanRecordPage} />
                <Route path="/my/invitation" component={InvitationPage} />
                <Route path="/my/myGift" component={MyGiftPage}>
                        <Route path="/my/myGift/list(/:couponType)" component={MyGiftDetailPage} />
                </Route>

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
