import BorrowApplyPage from './components/BorrowApplyPage'
import BorrowListPage from './components/BorrowListPage'
import { connect } from 'react-redux'
import {fetchCity,borrowApply} from 'actions'
module.exports = {
    path: '/borrow',
    component:connect((state,ownProps)=>({
        borrowProductList: state.product.borrowProductList
    }),{
        fetchCity,
        borrowApplyAction:borrowApply
    })(require('./components/BorrowNavPage')),
    /*
    * getComponent(nextState, cb) {
     require.ensure([], (require) => {
     cb(null, connect((state,ownProps)=>({
     borrowProductList: state.product.borrowProductList
     }),{
     fetchCity,
     borrowApplyAction:borrowApply
     })(require('./components/BorrowNavPage')))
     })
     },*/
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
