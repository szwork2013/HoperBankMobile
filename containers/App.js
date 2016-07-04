import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Explore from '../components/Explore'
import TabBar from '../components/TabBar'

class App extends Component {
  constructor(props) {
    super(props)

  }



  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
        <a href="/Home">home</a>
      </p>
    )
  }

  render() {
    const { children } = this.props
    return (
        <div>
            {children}
            <TabBar></TabBar>
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
