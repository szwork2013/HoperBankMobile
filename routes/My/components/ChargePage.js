import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import { connect } from 'react-redux'
import {charge} from 'actions'
import {BaseButton,TextButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
class ChargePage extends Component{
    constructor(props) {
        super(props)

        this.state={
            amtMoney:props.location.query.amt || 100,
            overlayShouldShow:false,
            canSubmit:true
        }
        this.amtMoneyChange = this.amtMoneyChange.bind(this);
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
                    <span className="input-item-left">充值金额</span>
                    <span className="input-item-right">
                            <input type="text" placeholder="请输入金额" value={this.state.amtMoney} onChange={this.amtMoneyChange}/>
                    </span>
                </div>
                <BaseButton text="立即充值" className={this.state.canSubmit ? '' : 'disabled'} style={{marginTop:'20px'}}
                            disabled={!this.state.canSubmit}
                            onClick={()=>{
                            this.doCharge()
                            }} />
                <div className="tip-section-2">
                    温馨提示：充值金额必须大于或等于100元。
                </div>
                <form ref="form" action={props.chargeUrl}>
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
        if(this.state.amtMoney <100){
            alert('100元起充');
            return false;
        }

        const props = this.props;
        if(this.checkInput()){
            this.setState({
                overlayShouldShow:true
            })
            props.charge({
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
    }
    checkInput(){
        const amtMoney = this.state.amtMoney;
        if(amtMoney < 100){
            alert('100元起充值')
            return false;
        }
        return true;
    }
}
ChargePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        chargeUrl:state.fuiouURI.charge
    }
}

export default connect(mapStateToProps, {
    charge
})(ChargePage)
