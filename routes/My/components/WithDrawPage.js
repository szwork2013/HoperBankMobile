import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import { connect } from 'react-redux'
import {withDraw} from 'actions'
import {BaseButton,TextButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
class WithDrawPage extends Component{
    constructor(props) {
        super(props)
        this.state={
            amtMoney:100,
            overlayShouldShow:false,
            canSubmit:true
        }
        this.amtMoneyChange = this.amtMoneyChange.bind(this);
        this.checkInput = this.checkInput.bind(this)
    }
    componentWillMount() {
        if(!this.props.account.userId){
            this.context.router.push('/login')
            return false;
        }
        this.setState({
            canSubmit:reg.test(this.state.amtMoney)
        })
    }
    amtMoneyChange(ins){

        this.setState({
            amtMoney:ins.target.value,
            canSubmit:reg.test(ins.target.value)
        })
    }
    render(){
        const props = this.props,
            product = props.product;
        return(
            <section className="level-2-wrap">
                <RootLoading display={this.state.overlayShouldShow}/>
                <div className="input-item">
                    <span className="input-item-left">账户余额</span>
                    <span className="input-item-right">{props.account.balance}元</span>
                </div>
                <div className="input-item white">
                    <span className="input-item-left">提现金额</span>
                    <span className="input-item-right">
                            <input type="text" placeholder="请输入金额" value={this.state.amtMoney} onChange={this.amtMoneyChange}/>
                    </span>
                </div>
                <BaseButton text="提现" className={this.state.canSubmit ? '' : 'disabled'} style={{marginTop:'20px'}}
                            disabled={!this.state.canSubmit}
                            onClick={()=>{
                            this.setState({
                                overlayShouldShow:true
                            })
                            this.doCharge()
                            }} />
                <div className="tip-section-2">
                    温馨提示：<br />目前提现100元或以上，免收手续费（手续费由平台承担）。100元以下收取2元/笔手续费。该费用为第三方支付平台收取
                </div>
                <form ref="form" action={props.withDrawUrl}>
                    <input type="hidden" name="amt" />
                    <input type="hidden" name="mchnt_cd" />
                    <input type="hidden" name="mchnt_txn_ssn" />
                    <input type="hidden" name="login_id" />
                    <input type="hidden" name="page_notify_url" />
                    <input type="hidden" name="back_notify_url" />
                    <input type="hidden" name="signature" />
                </form>
            </section>
        )
    }
    doCharge(){
        const props = this.props;
        if(this.checkInput()){
            props.withDraw({
                amt:this.state.amtMoney,
                callback:(result)=>{
                    if(result.r==1){
                        let form = this.refs.form,
                            recharge=result.recharge;
                        form.amt.value = recharge.amt;
                        form.mchnt_cd.value = recharge.mchnt_cd;
                        form.mchnt_txn_ssn.value = recharge.mchnt_txn_ssn;
                        form.login_id.value = recharge.login_id;
                        form.page_notify_url.value = recharge.page_notify_url;
                        form.back_notify_url.value = recharge.back_notify_url;
                        form.signature.value = recharge.signature;
                        form.submit();
                    }else{
                        alert(result.message)
                    }
                }
            })
        }
        this.setState({
            overlayShouldShow:false
        })
    }
    checkInput(){
        const amtMoney = this.state.amtMoney;
        if(amtMoney < 2){
            alert('2元起提现')
            return false;
        }else if(amtMoney>this.props.account.balance){
            alert('余额不足')
            return false;
        }
        return true;
    }
}
WithDrawPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        withDrawUrl:state.fuiouURI.withdraw
    }
}

export default connect(mapStateToProps, {
    withDraw
})(WithDrawPage)
