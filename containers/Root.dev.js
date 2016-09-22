import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import rootRoute from '../rootRoutes'
import { Router } from 'react-router'


export default class Root extends Component {
  render() {
    const { store, history } = this.props
    return (
        <Provider store={store}>
              <div style={{position:'relative',height:'100%',maxHeight:'736px',maxWidth:'414px'}}>
                  <Router history={history} routes={rootRoute} />
              </div>
        </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
