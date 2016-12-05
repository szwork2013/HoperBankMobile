import LoginPage from './components/LoginPage'
import RegisterPage from './components/ReigsterPage'
import ForgotPassWordPage from './components/ForgotPassWordPage'
import RiskTestPage from './components/RiskTestPage'
import Auth from 'utils/auth'
import { connect } from 'react-redux'
import { doLogin,asyncRisk } from 'actions'
module.exports = [
    {
        onEnter:(nextState,replace)=>{
            Auth.logged() && replace('/my')
        },
        path:'/login',
        component:connect(()=>({}),{
            doLogin
        })(LoginPage)
    },
    {
        path:'/register',
        component:RegisterPage,
        childRoutes:[
            {
                path: '/register/agreement',
                getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                        cb(null, require('./components/RegisterAgreementPage'))
                    })
                }
            }
        ]
    },
    {
        path:'/forgot',
        component:ForgotPassWordPage
    },
    {
        path:'/risktest',
        component:connect(()=>({}),{
            asyncRisk
        })(RiskTestPage)
    }
]
