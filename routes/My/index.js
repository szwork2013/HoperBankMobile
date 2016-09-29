import Auth from 'utils/auth'
import PersonalPage from './components/PersonalPage'
import BindBankPage from './components/BindBankPage'
import DealRecordPage from './components/DealRecordPage'
import MyInvestmentPage from './components/MyInvestmentPage'
import ReturnedPlanRecordPage from './components/ReturnedPlanRecordPage'
import InvitationPage from './components/InvitationPage'
import MyGiftPage from './components/MyGiftPage'
import MyGiftDetailPage from './components/MyGiftDetailPage'
import ChargePage from './components/ChargePage'
import WithDrawPage from './components/WithDrawPage'
import ResetPassWordPage from './components/ResetPassWordPage'
import ChoseRebuyPage from './components/ChoseRebuyPage'
import CreditorListPage from './components/CreditorListPage'
import CreditorDetailPage from './components/CreditorDetailPage'

module.exports = {
    onEnter:(nextState, replace)=>{
        !Auth.logged() && replace('/login')
    },
    path: '/my',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/MyPage'))
        })
    },
    childRoutes:[
        {
            path:'/my/bindbank',
            component:BindBankPage
        },
        {
            path:'/my/personal',
            component:PersonalPage,
            childRoutes:[
                {
                    path:'/my/personal/resetPassWord',
                    component:ResetPassWordPage
                }
            ]
        },
        {
            path:'/my/dealrecord',
            component:DealRecordPage
        },
        {
            path:'/my/investmentrecord',
            component:MyInvestmentPage,
            childRoutes:[
                {
                    path:'/my/investmentrecord/select',
                    component:ChoseRebuyPage
                },
                {
                    path:'/my/investmentrecord/creditorList:investId',
                    component:CreditorListPage,
                    childRoutes:[
                        {
                            path:'/my/investmentrecord/creditorList:investId/detail',
                            component:CreditorDetailPage
                        }
                    ]
                }
            ]
        },
        {
            path:'/my/returnPlanRecordPage',
            component:ReturnedPlanRecordPage
        },
        {
            path:'/my/invitation',
            component:InvitationPage
        },
        {
            path:'/my/myGift',
            component:MyGiftPage,
            childRoutes:[
                {
                    path:'/my/myGift/list(/:couponType)',
                    component:MyGiftDetailPage
                }
            ]
        },
        {
            path:'/my/charge',
            component:ChargePage
        },
        {
            path:'/my/withdraw',
            component:WithDrawPage
        }
    ]
}
