import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from '../components/Explore'
import TabNavigator from '../components/TabNavigator'

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { children } = this.props
    return (
        <div style={{height:'100%'}}>
            {children}
            <TabNavigator></TabNavigator>
        </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
  }
}

export default connect(mapStateToProps, {
})(App)
