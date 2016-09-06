import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as asyncActions from '../actions'
import { browserHistory } from 'react-router'
import TabNavigator from '../components/TabNavigator'

class App extends Component {
  constructor(props) {
    super(props)
      console.log(this.props)
  }

  render() {
    const { children } = this.props
    return (
        <div style={{height:'100%'}}>
            {children && React.cloneElement(children, {
                borrowProductList: this.props.state.product.borrowProductList,
                borrowApplyAction:this.props.borrowApply,
                asyncCheckId:this.props.asyncCheckId,
                fetchCity:this.props.fetchCity
            })}
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
