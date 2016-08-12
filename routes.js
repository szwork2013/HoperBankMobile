import React from 'react'
import { Route,IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import BorrowNavPage from './containers/BorrowNavPage'
import MyPage from './containers/MyPage'
import ChargePage from './containers/ChargePage'
import WithDrawPage from './containers/WithDrawPage'
import LoginPage from './containers/LoginPage'
import RegisterPage from './containers/ReigsterPage'
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
import InvestMainPage from './containers/InvestMainPage'
import ProductDetail from './containers/FinancialProductDetail'
import FinancialProductRecord from './containers/FinancialProductRecord'
import FinancialReturnPlan from './containers/FinancialReturnPlan'
import DealResultPage from './containers/DealResultPage'
export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}  />
        <Route path="/home" component={HomePage} >

        </Route>

        /*层数越多，页面上加载的dom元素就越多，安卓比较卡，如果有必要将所有的二级全部放到外面性能最好，但是会大幅度降低用户体验*/

        <Route path="/financial" component={FinancialPage}>
            <Route path="/financial/product/:productType/:id" component={InvestMainPage}>
                <Route path="/financial/product/:productType/:id/detail" component={ProductDetail} />
                <Route path="/financial/product/:productType/:id/record" component={FinancialProductRecord} />
                <Route path="/financial/product/:productType/:id/returnPlan" component={FinancialReturnPlan} />
                <Route path="/financial/product/:productType/:id/dealResult" component={DealResultPage} />
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
            <Route path="/my/charge" component={ChargePage} />
            <Route path="/my/withdraw" component={WithDrawPage} />
        </Route>
        <Route path="/myteam" component={TeamPage}>
            <Route path="/myteam/teamlist" component={TeamListPage}>

            </Route>
            <Route path="/myteam/royaltylist" component={RoyaltyList}>

            </Route>
        </Route>
        <Route path="/login" component={LoginPage}>

        </Route>
        <Route path="/register" component={RegisterPage}>

        </Route>

        <Route path="*" component={NoMatch}/>
    </Route>
)
