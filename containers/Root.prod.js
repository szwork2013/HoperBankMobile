import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../rootRoutes'
import { Router } from 'react-router'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <div style={{position:'relative',height:'100%'}}>
        <Router history={history} routes={routes} />
          </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
