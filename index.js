import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import './store/locationstorage'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './less/v1.less'
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)