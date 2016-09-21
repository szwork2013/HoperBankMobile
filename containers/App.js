import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as asyncActions from '../actions'
import { browserHistory } from 'react-router'
import TabNavigator from '../components/TabNavigator'

class App extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.childrenFilter = this.childrenFilter.bind(this);
    }
    componentWillMount(){
        //console.log(this.props.children.type)
        console.log
        React.Children.map(this.props.children,child=>{
            console.log(child.type.displayName)
        })
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
            default:
                childrenPorps={
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
