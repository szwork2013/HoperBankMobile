import { connect } from 'react-redux'
import {fetchCity,borrowApply} from 'actions'
import TempRecordList from './components/TempRecordList'
import DiscoverPage from './components/DiscoverPage'
import TempRecordDetail from './components/TempRecordDetail'
import BorrowListPage from '../Borrow/components/BorrowListPage'
import AboutUsPage from './components/AboutUsPage'
import BorrowApplyPage from '../Borrow/components/BorrowApplyPage'
module.exports = {
    path: '/discover',
    /*getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, connect((state,ownProps)=>({
            }),{
            })(require('./components/DiscoverPage')))
        })
    },*/
    component:DiscoverPage,
    childRoutes:[
        {
            path:'/discover/media/:type',
            component:TempRecordList,
            childRoutes:[
                {
                    path:'/discover/media/:type/:id',
                    component:TempRecordDetail
                }
            ]
        },
        {
            path:'/discover/knowledge/:type',
            component:TempRecordList,
            childRoutes:[
                {
                    path:'/discover/knowledge/:type/:id',
                    component:TempRecordDetail
                }
            ]
        },
        {
            path:'/discover/about',
            component:AboutUsPage
        },
        {
            path:'/discover/borrow/list',
            component:connect((state,ownProps)=>({
                list: state.product.borrowProductList
            }),{
            })(BorrowListPage),
            childRoutes:[
                {
                    path:'/discover/borrow/apply',
                    component:connect((state,ownProps)=>({
                    }),{
                        fetchCity,
                        applyAction:borrowApply
                    })(BorrowApplyPage),
                }
            ]
        },
    ]
}
