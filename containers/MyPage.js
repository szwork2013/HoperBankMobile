import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAccount } from '../actions'
import IconButton from '../components/IconButton'
class MyPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchAccount('15718')
  }
  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {

  }


  render() {
    const account = this.props.account;
    console.log(account)
    return (
        <section style={{paddingBottom:'70px'}} className="gray-bg">
          <section className="my-wrap">
              <div className="my-info-top">
                <div className="my-avatar-wrap">
                  <h2 id="sumMoney">{account ? account.totalIncome : <icon className="loading"></icon>}</h2>
                  <p>累计总收益(元)</p>
                  <div className="my-account-wrap">
                    <div>
                      <p className="p1" id="freeze">{account ? account.freezeMoney : <icon className="loading"></icon>}</p>
                      <p className="p2">冻结余额(元)</p>
                      <div className="line-2"></div>
                    </div>
                    <div>
                      <p className="p1" id="principal">{account ? account.principalMoney : <icon className="loading"></icon>}</p>
                      <p className="p2">待收本金(元)</p>
                      <div className="line-2"></div>
                    </div>
                    <div>
                      <p className="p1" id="invest">{account ? account.invest : <icon className="loading"></icon>}</p>
                      <p className="p2">待收利息(元)</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-info-bottom">
                <div className="part-1">
                  <p className="p1" id="balance">{account ? account.balance : <icon className="loading"></icon>}</p>
                  <p className="p2">可用余额(元)</p>
                </div>
                <div className="part-2">
                  <a href="charge.html" className="btn-2" id="charge_btn">充值</a>
                  <a href="withdraw.html" className="btn-1" id="tx_btn">提现</a>
                </div>
              </div>
          </section>
          <section className={account && account.name ? 'm-item-wrap tip-section hide':'m-item-wrap tip-section show'} id="authentication">
            <div className="m-item">
              <a className="m-item-a"  href="bindbank.html">
                随时随地投资，请先<span style={{color:"#004fa3"}}>实名认证</span>
                <div className="arrow-wrap">
                  <i className="icon icon-arrow-right"></i>
                </div>
              </a>
            </div>
          </section>
          <section className="my-btn-wrap">
            <IconButton text="交易记录" icon="icon-record" />
            <IconButton text="我的投资" icon="icon-lcproduct" />
            <IconButton text="我的回款" icon="icon-authentication" />
            <IconButton text="个人资料" icon="icon-personal" />
            <IconButton text="我的推荐码" icon="icon-dimension-code" />
            <IconButton text="我的礼券" icon="icon-gift" />
            <IconButton text="客服热线" icon="icon-user3" hasBorder={false} href="tel:4008-758-338" hasArrow={false} arrowText="4008-758-338"/>
          </section>
          <section className="my-exit-wrap">
            <input className="my-exit-btn" type="button" id="exit" value="安全退出"/>
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
})(MyPage)
