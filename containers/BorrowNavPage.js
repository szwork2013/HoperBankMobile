import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class BorrowNavPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    return (
          <section>
            <ReactCSSTransitionGroup component="div"
                                     transitionName="slide-right"
                                     transitionEnterTimeout={300} transitionLeaveTimeout={300}>
              {this.props.children}
            </ReactCSSTransitionGroup>
            <div className="borrow-banner">
              <img src="/static/img/loan_1080_546.jpg" width="100%" />
            </div>
            <div className="borrow-nav-item">
              <Link to={{pathname:'/borrow/list'}}>
                <div className="borrow-nav-icon"></div>
                <div className="borrow-nav-info">
                  <h2>快速申请</h2>
                  <p>优先接受深圳地区的借款申请，提交申请后我们将在2个工作日内和您取得联系。</p>
                </div>
              </Link>
            </div>
            <div className="borrow-nav-item">
              <Link to='/borrow/apply'>
                <div className="borrow-nav-icon icon2"></div>
                <div className="borrow-nav-info">
                  <h2>合作项目</h2>
                  <p>优先接受深圳地区的借款申请，提交申请后我们将在2个工作日内和您取得联系。</p>
                </div>
              </Link>
            </div>
          </section>
    )
  }
}
