import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { fetchAccount } from '../actions'
import IconButton from '../components/IconButton'
class LoginPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  componentDidMount(){

  }
  render() {
    return (
        <section className="wrap">
          <section className="m-item-wrap">
            <div className="m-item">
              <i className="icon icon-phone"></i>
              <label>
                <input type="text" className="w80-p"  data-reg="^[1][3758][0-9]{9}$" data-require="请输入手机号" id="mobile" data-error="手机号错误"  placeholder="请输入手机号" />
              </label>
            </div>
            <div className="m-item">
              <i className="icon icon-pwd"></i>
              <label>
                <input type="password" id="passwd" data-require="请输入密码"   placeholder="请输入密码" />
              </label>
            </div>
          </section>
          <section className="m-item-2 mt20">
            <a href="findoutPwd.html" className="fr" style="color:#004fa3">忘记密码?</a>
          </section>
          <section className="m-btn-wrap">
            <input className="btn  btn-3" id="login_btn" type="button" value="登 录"/>
          </section>
          <section className="m-btn-wrap">
            <a className="btn btn-4" href="register.html">注 册</a>
          </section>
        </section>

    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    account:state.account ? state.account.account : null
  }
}

export default connect(mapStateToProps, {
  fetchAccount
})(LoginPage)
