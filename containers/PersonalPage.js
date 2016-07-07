import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { fetchAccount } from '../actions'
import IconButton from '../components/IconButton'
class PersonalPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  componentDidMount(){

  }
  render() {
    const account = this.props.account;
    return (
        <section className="level-2-wrap">
          <div className="text-line-item-wrap" style={{marginTop:'30px'}}>
            <TextLineItem leftText="手机号码" rightText={account.mobile} />
            <TextLineItem leftText="实名认证" rightText={account.name ? account.name +'('+account.idCard +')' :'未实名'} />
            <TextLineItem hasBorder={false} leftText="绑定银行卡" rightText={account.bankCard || '未绑定'} />
          </div>

        </section>
    )
  }
}
class TextLineItem extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
        <section className="text-line-item">
          <div className={"text-line-item-con " + (props.hasBorder ? '': 'no-border') } >
            <span className="text-line-item-con-left">
              {props.leftText}
            </span>
            <span className="text-line-item-con-right">
              {props.rightText}
            </span>
          </div>
        </section>
    )
  }
}
TextLineItem.propTypes = {
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  hasBorder:PropTypes.bool
}
TextLineItem.defaultProps = {
  leftText: '',
  rightText:'',
  hasBorder:true
}

function mapStateToProps(state, ownProps) {
  return {
    account:state.account ? state.account.account : null
  }
}

export default connect(mapStateToProps, {
  fetchAccount
})(PersonalPage)
