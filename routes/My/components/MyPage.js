import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAccount,doLogout,authentication } from 'actions'
import IconButton from 'IconButton'
import RootLoading from 'RootLoading'
import { browserHistory,Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class MyPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
        this.logout = this.logout.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }
    componentWillMount() {
        this.props.fetchAccount(this.props.account.userId,()=>{
            this.setState({
                loaded:true
            })
        })
    }
    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {

    }
    logout(){
        var r = confirm("确定要退出吗？")
        if(r){
            this.props.doLogout();
            this.context.router.push('/login')
        }
    }
    jumpTo(link){
        this.context.router.push(link)
    }
    jumpToCharge(){
        if(!this.props.account.name){
            alert('请先实名认证')
            this.jumpTo('/my/bindbank')
            return false;
        }
        this.jumpTo('/my/charge')
    }
    jumpToWithDraw(){
        if(!this.props.account.name){
            alert('请先实名认证')
            this.jumpTo('/my/bindbank')
            return false;
        }
        this.jumpTo('/my/withdraw')
    }
    render() {
        const account = this.props.account;
        return (
            <section style={{paddingBottom:'70px'}} className="gray-bg">
                <RootLoading display={!this.state.loaded}/>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children && React.cloneElement(this.props.children, {
                            asyncCheckId:this.props.asyncCheckId,
                            userId:this.props.account.userId,
                            mobile:this.props.account.mobile,
                            fetchCity:this.props.fetchCity,
                            authentication:this.props.authentication,
                            fetchCreditorlist:this.props.fetchCreditorlist,
                            creditorList:this.props.creditorList,
                            fetchAccount:()=>{
                                this.props.fetchAccount(this.props.account.userId)
                            }
                        })
                    }

                </ReactCSSTransitionGroup>

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
                            <button onClick={this.jumpToCharge.bind(this)} className="btn-2" >充值</button>
                            <button  onClick={this.jumpToWithDraw.bind(this)} disabled={parseInt(account.isBorrower)} className={`btn-1 ${parseInt(account.isBorrower)?'disabled':''}`}>提现</button>
                        </div>
                    </div>
                </section>
                {
                    account && !account.name && <section className={'m-item-wrap tip-section'}>
                        <div className="m-item">
                            <Link className="m-item-a"  to="/my/bindbank">
                                随时随地投资，请先<span style={{color:"#004fa3"}}>实名认证</span>
                            </Link>
                        </div>
                    </section>
                }

                <section className="my-btn-wrap">
                    <IconButton text="交易记录" icon="icon-record" onClick={()=>{this.jumpTo('/my/dealrecord')}} />
                    <IconButton text="我的投资" icon="icon-lcproduct" onClick={()=>{this.jumpTo('/my/investmentrecord')}} />
                    <IconButton text="我的回款" icon="icon-authentication" onClick={()=>{this.jumpTo('/my/returnPlanRecordPage')}} />
                    <IconButton text="个人资料" icon="icon-personal" onClick={()=>{this.jumpTo('/my/personal')}} />
                    <IconButton text="我的推荐码" icon="icon-dimension-code" onClick={()=>{this.jumpTo('/my/invitation')}}  />
                    <IconButton text="我的礼券" icon="icon-gift" onClick={()=>{this.jumpTo('/my/myGift')}} />
                    <IconButton text="客服热线" icon="icon-user3" hasBorder={false} href="tel:4008-758-338" hasArrow={false} arrowText="4008-758-338"/>
                </section>
                <section className="my-exit-wrap">
                    <input className="my-exit-btn" type="button" id="exit" onClick={this.logout} value="安全退出"/>
                </section>

            </section>

        )
    }
}

MyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account
    }
}

module.exports = connect(mapStateToProps, {
    fetchAccount,
    doLogout,
    authentication
})(MyPage)
