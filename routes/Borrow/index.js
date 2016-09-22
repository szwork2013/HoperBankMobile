import BorrowApplyPage from './components/BorrowApplyPage'
import BorrowListPage from './components/BorrowListPage'
module.exports = {
    path: '/borrow',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/BorrowNavPage'))
        })
    },
    childRoutes:[
        {
            path:'/borrow/apply',
            component:BorrowApplyPage
        },
        {
            path:'/borrow/list',
            component:BorrowListPage
        },
    ]
}
