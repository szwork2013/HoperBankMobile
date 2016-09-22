import LoginPage from './components/LoginPage'
import RegisterPage from './components/ReigsterPage'
import ForgotPassWordPage from './components/ForgotPassWordPage'
module.exports = [
    {
        path:'/login',
        component:LoginPage
    },
    {
        path:'/register(/:referrerName)',
        component:RegisterPage
    },
    {
        path:'/forgot',
        component:ForgotPassWordPage
    }
]
