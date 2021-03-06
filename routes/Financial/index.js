import InvestMainPage from './components/InvestMainPage'
import FinancialProductDetail from './components/FinancialProductDetail'
import FinancialProductRecord from './components/FinancialProductRecord'
import FinancialReturnPlan from './components/FinancialReturnPlan'
import DealResultPage from './components/DealResultPage'
import InvestConfirmPage from './components/InvestConfirmPage'
import InvestConfirmSelectCouponPage from './components/InvestConfirmSelectCouponPage'
import { connect } from 'react-redux'
import {fetchConfirmPageCoupon,payForProduct,fetchAccount} from 'actions'
module.exports = {
    path: '/financial',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/FinancialPage'))
        })
    },
    childRoutes: [
        {
            path:'/financial/product/:productType/:id',
            component:connect(null,{
                fetchAccount
            })(InvestMainPage),
            childRoutes: [
                {
                    path:"/financial/product/:productType/:id/confirm",
                    component:connect(null,{
                        fetchConfirmPageCoupon,
                        payForProduct
                    })(InvestConfirmPage),
                    childRoutes:[
                        {
                            path:'/financial/product/:productType/:id/confirm/coupon/:type',
                            component:InvestConfirmSelectCouponPage
                        }
                    ]
                },
                {
                    path:"/financial/product/:productType/:id/detail",
                    component:connect((state,ownProps)=>({
                        productInfo:state.product.productDetail
                    }),{})(FinancialProductDetail)
                },
                {
                    path:"/financial/product/:productType/:id/record",
                    component:FinancialProductRecord
                },
                {
                    path:"/financial/product/:productType/:id/returnPlan",
                    component:FinancialReturnPlan
                },
                {
                    path:"/financial/product/:productType/:id/dealResult",
                    component:connect(null,{
                        fetchAccount
                    })(DealResultPage)
                }
            ]
        }
    ]
}
