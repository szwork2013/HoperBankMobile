import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router } from 'react-router'

export default class Root extends Component {
  render() {
    const { store, history } = this.props
    /*return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )*/
    return (
        <Provider store={store}>
          <div>
              <div style={{width:'375px',height:'667px',float:'left',position:'relative'}}>
                  <Router history={history} routes={routes} />
              </div>
          </div>

        </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
