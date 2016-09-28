import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as asyncActions from '../actions'
import TabNavigator from '../components/TabNavigator'

class App extends Component {
    constructor(props) {
        super(props)
        this.childrenFilter = this.childrenFilter.bind(this);
    }
    childrenFilter(componentName){
        var childrenPorps = {};
        switch(componentName){
            case 'BorrowNavPage':
                childrenPorps= {
                    fetchCity:this.props.fetchCity,
                    borrowApplyAction:this.props.borrowApply,
                    borrowProductList: this.props.state.product.borrowProductList
                }
                break;
            case 'FinancialPage':
                childrenPorps= {
                    fetchConfirmPageCoupon:this.props.fetchConfirmPageCoupon,
                }
                break;
            default:
                childrenPorps={
                    fetchCity:this.props.fetchCity,
                    borrowApplyAction:this.props.borrowApply,
                    fetchConfirmPageCoupon:this.props.fetchConfirmPageCoupon,
                    borrowProductList: this.props.state.product.borrowProductList,
                    asyncCheckId:this.props.asyncCheckId,
                    fetchCreditorlist:this.props.fetchCreditorlist,
                    creditorList:this.props.state.user.creditorList
                }
        }
        return childrenPorps;

    }
    render() {
        const { children } = this.props
        return (
            <div style={{height:'100%'}}>
                {children && React.cloneElement(children, this.childrenFilter(children.type.displayName))}
                <TabNavigator rootState={this.props.state} >

                </TabNavigator>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        state
    }
}

export default connect(mapStateToProps, asyncActions)(App)
