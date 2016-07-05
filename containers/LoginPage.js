import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { fetchAccount } from '../actions'
import IconButton from '../components/IconButton'
import IconInput from '../components/IconInput'
import {BaseButton} from '../components/Button'
class LoginPage extends Component {
  constructor(props) {
    super(props)
      this.state={
          userNamePassed:false,
          passWordPassed:false
      }
  }
  componentWillMount() {
  }
  componentDidMount(){

  }
  render() {
    return (
        <section className="form-wrap" style={{marginTop:'30px'}}>
          <section className="m-item-wrap">
              <IconInput
                  placeholder="请输入手机号"
                  icon="icon-phone"
                  rule="^[1][3758][0-9]{9}$"
                  callback={(b)=>{this.setState({userNamePassed:b})}}>
              </IconInput>
              <IconInput
                  placeholder="请输入密码"
                  icon="icon-pwd"
                  rule="^\w{6}$"
                  hasBorder={false}
                  type="password"
                  callback={(b)=>{this.setState({passWordPassed:b})}}>
              </IconInput>
          </section>
          <section className="m-item-2 mt20">
            <a href="findoutPwd.html" className="fr">忘记密码?</a>
          </section>
            <BaseButton text="登 录" />
            <BaseButton text="注 册" className="register"/>
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
