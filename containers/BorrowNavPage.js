import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../actions'
import ReactSwipe from 'react-swipe';

class BorrowNavPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //loadData(this.props)

  }
  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {

  }


  render() {
    return (
          <section>
            <div className="borrow-banner">
              <img src="/static/img/loan_1080_546.jpg" width="100%" />
            </div>
            <div className="borrow-nav-item">
              <a href="borrowList.html">
                <div className="borrow-nav-icon"></div>
                <div className="borrow-nav-info">
                  <h2>快速申请</h2>
                  <p>优先接受深圳地区的借款申请，提交申请后我们将在2个工作日内和您取得联系。</p>
                </div>
              </a>
            </div>
            <div className="borrow-nav-item">
              <a href="cooperativeProject.html">
                <div className="borrow-nav-icon icon2"></div>
                <div className="borrow-nav-info">
                  <h2>合作项目</h2>
                  <p>优先接受深圳地区的借款申请，提交申请后我们将在2个工作日内和您取得联系。</p>
                </div>
              </a>
            </div>
          </section>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    aa:'bb'
  }
}

export default connect(mapStateToProps, {

})(BorrowNavPage)
