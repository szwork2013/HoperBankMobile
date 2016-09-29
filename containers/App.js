import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as asyncActions from '../actions'
import TabNavigator from '../components/TabNavigator'

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return (
            <div style={{height:'100%'}}>
                {children && React.cloneElement(children,{
                    asyncCheckId:this.props.asyncCheckId,
                    fetchCreditorlist:this.props.fetchCreditorlist,
                    creditorList:this.props.state.user.creditorList
                })}
                <TabNavigator>

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
