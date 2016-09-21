import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router'
import App from './App'
function redirectHome(nextState, replace,cb){
    replace('/home')
    cb();
}
const rootRoute = {
    //onEnter: redirectHome,
    path: '/',
    component: App,
    indexRoute: {
        getComponent: (nextState, cb) => {
            // Only load if we're logged in

                return require.ensure([], (require) => {
                    cb(null, require('../routes/Home'))
                })

        }
    },
    childRoutes: [
        require('../routes/Home'),
        require('../routes/Borrow')
    ]
};

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
