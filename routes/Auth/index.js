import LoginPage from './components/LoginPage'
import RegisterPage from './components/ReigsterPage'
import ForgotPassWordPage from './components/ForgotPassWordPage'
module.exports = [
    {
        path:'/login',
        component:LoginPage
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
    }
]
