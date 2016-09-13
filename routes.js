import React from 'react'
import { Route,Redirect,IndexRedirect  } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import BorrowNavPage from './containers/BorrowNavPage'
import BorrowListPage from './containers/BorrowListPage'
import BorrowApplyPage from './containers/BorrowApplyPage'
import MyPage from './containers/MyPage'
import BindBankPage from './containers/BindBankPage'
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
import ChoseRebuyPage from './containers/ChoseRebuyPage'
import ReturnPlanRecordPage from './containers/ReturnedPlanRecordPage'
import InvitationPage from './containers/InvitationPage'
import MyGiftPage from './containers/MyGiftPage'
import MyGiftDetailPage from './containers/MyGiftDetailPage'
import InvestMainPage from './containers/InvestMainPage'
import ProductDetail from './containers/FinancialProductDetail'
import FinancialProductRecord from './containers/FinancialProductRecord'
import FinancialReturnPlan from './containers/FinancialReturnPlan'
import DealResultPage from './containers/DealResultPage'
import ActivityCenterPage from './containers/ActivityCenter'
import CreditorListPage from './containers/CreditorListPage'
import CreditorDetailPage from './containers/CreditorDetailPage'
import ActivityDetailPage from './containers/ActivityDetail'
import InvestConfirmPage from './containers/InvestConfirmPage'
export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Redirect from="/" to="/home" />
        <Route path="/home" component={HomePage} >
            <Route path="/activity" component={ActivityCenterPage} >
                <Route path="/activity/detail" component={ActivityDetailPage} >

                </Route>
            </Route>

        </Route>

        /*层数越多，页面上加载的dom元素就越多，安卓比较卡，如果有必要将所有的二级全部放到外面性能最好，但是会大幅度降低用户体验*/

        <Route path="/financial"  getComponent={(nextState, cb)=>{
            //console.log(nextState)
            cb(null,FinancialPage)
        }}>
            <Route path="/financial/product/:productType/:id" component={InvestMainPage}>
                <Route path="/financial/product/:productType/:id/confirm" component={InvestConfirmPage} />
                <Route path="/financial/product/:productType/:id/detail" component={ProductDetail} />
                <Route path="/financial/product/:productType/:id/record" component={FinancialProductRecord} />
                <Route path="/financial/product/:productType/:id/returnPlan" component={FinancialReturnPlan} />
                <Route path="/financial/product/:productType/:id/dealResult" component={DealResultPage} />
            </Route>
        </Route>
        <Route path="/borrow" component={BorrowNavPage}>
            <Route path="/borrow/list" component={BorrowListPage}>

            </Route>
            <Route path="/borrow/apply" component={BorrowApplyPage}>

            </Route>
        </Route>
        <Route path="/my" component={MyPage}>
            <Route path="/my/bindbank" component={BindBankPage} />
            <Route path="/my/personal" component={PersonalPage} />
            <Route path="/my/dealrecord" component={DealRecordPage} />
            <Route path="/my/investmentrecord" component={MyInvestmentPage}>
                <Route path="/my/investmentrecord/select" component={ChoseRebuyPage}>

                </Route>
                <Route path="/my/investmentrecord/creditorList:investId" component={CreditorListPage}>
                    <Route path="/my/investmentrecord/creditorList:investId/detail" component={CreditorDetailPage}>

                    </Route>
                </Route>
            </Route>
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
