import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import { connect } from 'react-redux'
import {fetchFinancialServices,payForProduct} from '../actions'
import RootLoading from '../components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {BaseButton,TextButton} from '../components/Button'
import Overlay from '../components/Overlay'
class InvestPage2 extends Component{
    constructor(props) {
        super(props)
        this.state={
            amtMoney:10000,
            loaded:false,
            overlayShouldShow:false,
            canSubmit:true,
            ableBuy:true
        }
        console.log(props)
        this.amtMoneyChange = this.amtMoneyChange.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        props.fetchFinancialServices({
            projectId:props.params.id,
            type:props.params.productType,
            callback:(result)=>{
                this.setState({
                    loaded:true
                })
                if(result.productInfo.status>1){
                    this.setState({
                        ableBuy:false
                    })
                    let msg = '';
                    switch (result.productInfo.status){
                        case 2:
                            msg='该项目已投满';
                            break;
                        case 3:
                            msg="该项目待划拨";
                            break;
                        case 4:
                            msg="该项目正在结算中";
                            break;
                        case 5:
                            msg="该项目已结束";
                            break;
                        //no default;
                    }
                    setTimeout(()=>{
                        alert(msg);
                    },300)
                }
            }
        })
    }
    amtMoneyChange(ins){
        const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/g
        this.setState({
            amtMoney:ins.target.value,
            canSubmit:reg.test(ins.target.value)
        })
    }
    calculate(money,rate,productCycle){
        return (money * (rate / 100 / 12) * Math.pow(1 + (rate / 100 / 12), productCycle) / (Math.pow(1 + (rate / 100 / 12), productCycle) - 1) * productCycle - money).toFixed(2);
    }
    render(){
        const show={
            transform:`translate(0,-${$(this.refs.shoppingWindow).outerHeight()}px)`
        }
        const hide={
            transform:'translate(0,0)'
        }
        const props = this.props,
            product = props.product;
        return(
            <section className="level-2-wrap absolute">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <RootLoading display={!this.state.loaded}/>
                <div className="project-invest-wrap">
                    <div className="project-invest-info">
                        <div className="part-left">
                            <p className="p1">年化利率</p>
                            <p className="p2">{product.productRate}<span className="f14">%</span></p>
                        </div>
                        <div className="part-right">
                            <p className="p1"><span>期限<i>{product.productCycle}</i>个月</span></p>
                        </div>
                    </div>
                    <div className="project-invest-progress">
                        <div className="project-invest-progress-max">
                            <div className="project-invest-progress-current" style={{width:Math.floor(product.progress)+'%'}}>
                                <span>{ (product.progress ? Math.floor(product.progress) : 0) +'%'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="project-money-info">
                        <div className="d1">
                            项目总额{product.financingAmount}元
                        </div>
                        <div className="d2">
                            剩余可投{product.leftCopies}元
                        </div>
                    </div>
                    <div className="project-money-info-2">
                        <p>投资区间:<span className="s1">{product.atleastMoney}</span><span className="s2">元起投</span></p>
                        <p>还款方式:<span className="s2" >等额本息</span></p>
                    </div>
                </div>
                <TextButton text={`账户余额:${props.account.balance}`} hasBorder={false} hasIcon={false} style={{marginTop:'20px',borderTop:'1px solid #dcdcdc',borderBottom:'1px solid #dcdcdc'}} />
                <TextButton text="项目详情" style={{marginTop:'20px',borderTop:'1px solid #dcdcdc'}} onClick={()=>{
                        this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/detail`)
                    }} />
                <TextButton text="投标记录" onClick={()=>{
                        this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/record`)
                    }} />
                <TextButton text="还款计划" hasBorder={false} style={{borderBottom:'1px solid #dcdcdc'}} onClick={()=>{
                        this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/returnPlan`)
                    }} />
                <Overlay display={this.state.overlayShouldShow} onClick={()=>{
                    this.setState({
                        overlayShouldShow:false
                    })
                }} />
                <BaseButton text="立即购买" className={`fixed ${this.state.ableBuy ? '' : 'disabled'}`} disabled={!this.state.ableBuy} onClick={()=>{
                    this.setState({
                        overlayShouldShow:true
                    })
                }} />
                <div className={"shopping-window "} style={this.state.overlayShouldShow ? show : hide } ref="shoppingWindow">
                    <h3>投资项目:<span>{props.productName}</span></h3>
                    <div className="input-wrap">
                        <span className="input-wrap-text-1">投资金额</span>
                        <span className="input-wrap-2">
                            <input type="text" value={this.state.amtMoney} onChange={this.amtMoneyChange}/>元</span>
                    </div>
                    <div className="input-wrap">
                        <span className="input-wrap-text-1">预期收益</span>
                        <span className="input-wrap-2">
                            {this.calculate(this.state.amtMoney,product.productRate,product.productCycle)}元</span>

                    </div>
                    <BaseButton text="确认" className={this.state.canSubmit ? '' : 'disabled'}
                                disabled={!this.state.canSubmit}
                                style={{width:'100%',marginTop:'10px'}} onClick={this.doPay.bind(this,{productName:product.productName,rate:product.productRate,limit:product.productCycle})} />

                </div>
            </section>
        )
    }
    doPay(obj){
        const props = this.props;
        if(!props.account.userId){
            let r = confirm("请先登录");
            if(r){
                this.context.router.push({
                    pathname: '/login',
                    query: { backUrl: location.pathname }
                })
            }
            return false;
        }
        if(this.checkInput()){
            this.setState({
                loaded:false
            })
            props.payForProduct({
                type:props.params.productType,
                userId:props.account.userId,
                productId:props.params.id,
                amt:this.state.amtMoney,
                success:(result)=>{
                    this.setState({
                        loaded:true,
                        overlayShouldShow:false
                    })
                    this.context.router.push({
                        pathname:`/financial/product/${props.params.productType}/${props.params.id}/dealResult`,
                        query:{
                            amt:this.state.amtMoney,
                            sy:this.calculate(this.state.amtMoney,obj.rate,obj.limit),
                            product:obj.productName
                        }
                    })
                },
                fail:(result)=>{
                    this.setState({
                        loaded:true
                    })
                    setTimeout(()=>{
                        if(result.status==1006){
                            let r = confirm("余额不足，请充值！");
                            if(r){
                                this.context.router.push({
                                    pathname: '/my/charge',
                                    query: { amt:parseFloat(this.state.amtMoney)-parseFloat(props.account.balance) }
                                })
                            }
                        }else{
                            alert(result.message)

                        }
                    },300)

                }
            })
        }
    }
    checkInput(){
        const amtMoney = this.state.amtMoney;
        if(amtMoney < 100){
            alert('100元起投')
            return false;
        }
        return true;
    }
}
InvestPage2.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        product:state.product.productDetail
    }
}

export default connect(mapStateToProps, {
    fetchFinancialServices,
    payForProduct
})(InvestPage2)
