import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {fetchFinancialServices,payForProduct} from 'actions'
import RootLoading from 'components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {BaseButton,TextButton} from 'components/Button'
import Overlay from 'components/Overlay'
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
        this.amtMoneyChange = this.amtMoneyChange.bind(this);
        this.add = this.add.bind(this);
        this.minus = this.minus.bind(this);
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
                if(parseInt(this.props.account.isBorrower)){
                    this.setState({
                        ableBuy:false
                    })
                }
            }
        })

        props.account.userId && this.props.fetchAccount();
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
    add(){
        const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/g
        this.setState({
            amtMoney:parseFloat(this.state.amtMoney) + 100,
            canSubmit:reg.test(this.state.amtMoney + 100 + '')
        })
    }
    minus(){
        const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/g
        if(this.state.amtMoney<100){
            return false;
        }
        this.setState({
            amtMoney:parseFloat(this.state.amtMoney) - 100,
            canSubmit:reg.test(this.state.amtMoney + 100 + '')
        })
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
                    {this.props.children  && React.cloneElement(this.props.children, {
                        fetchConfirmPageCoupon:this.props.fetchConfirmPageCoupon,
                        userId:this.props.account.userId,
                        propPay:this.propPay.bind(this)
                    })}
                </ReactCSSTransitionGroup>
                <RootLoading display={!this.state.loaded}/>
                <div className="project-invest-wrap">
                    <h2>{product.productName}</h2>
                    <div className="project-invest-info">
                        <div className="part-left">
                            <p className="p2">{product.productRate}<span className="f14">%</span></p>
                            <p className="p1">年化利率</p>
                        </div>
                        <div className="part-right">
                            <p className="p1">{product.productCycle}个月</p>
                            <p className="p2">期限</p>
                        </div>
                    </div>

                    <div className="project-money-info">
                        <div className="d1">
                            项目金额:{product.financingAmount}元
                        </div>
                        <div className="d2">
                            剩余可投:{product.leftCopies}元
                        </div>
                    </div>
                    <div className="project-money-info">
                        <div className="d1">
                            还款方式:等额本息
                        </div>
                        <div className="d2">
                            账户余额:{props.account.balance}元
                        </div>
                    </div>
                    <div className="project-invest-progress">
                        <div className="project-invest-progress-max">
                            <div className="project-invest-progress-current" style={{width:Math.floor(product.progress)+'%'}}>

                            </div>
                            <span>{ (product.progress ? Math.floor(product.progress) : 0) +'%'}</span>
                        </div>
                    </div>
                </div>
                <TextButton text="项目详情" style={{borderTop:'1px solid #dcdcdc'}} onClick={()=>{
                        this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/detail`)
                    }} />
                <TextButton text="投标记录" onClick={()=>{
                        this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/record`)
                    }} />
                <TextButton text="还款计划" hasBorder={false} style={{borderBottom:'1px solid #dcdcdc'}} onClick={()=>{
                        this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/returnPlan`)
                    }} />
                <div className="edun-tip">
                    <i></i>
                    <span>E盾计划全面保障</span>
                </div>
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
                    <div className="input-wrap">
                        <span className="control minus" onClick={this.minus}></span>
                        <input type="text" value={this.state.amtMoney} onChange={this.amtMoneyChange}/>
                        <span className="control add" onClick={this.add}></span>
                    </div>
                    <div className="input-wrap">
                        <span className="input-wrap-text-1">预期收益</span>
                        <span className="input-wrap-2">
                            {this.calculate(this.state.amtMoney,product.productRate,product.productCycle)}元</span>

                    </div>
                    <BaseButton text="确认" className={this.state.canSubmit ? '' : 'disabled'}
                                disabled={!this.state.canSubmit}
                                style={{width:'100%',marginTop:'10px'}} onClick={this.doPay.bind(this,{productName:product.productName,rate:product.productRate,lowestBuy:product.atleastMoney,limit:product.productCycle})} />

                </div>
            </section>
        )
    }
    doPay(obj){
        const props = this.props;
        if(!props.account.userId){
            let r = confirm("请先登录");
            if(r){
                this.context.router.replace({
                    pathname: '/login',
                    query: { backUrl: location.pathname }
                })
            }
            return false;
        }
        if(this.checkInput(obj.lowestBuy)){
            //余额不足
            if(parseFloat(props.account.balance) < parseFloat(this.state.amtMoney)){
                let r = confirm("余额不足，请充值！");
                if(r){
                    this.context.router.push({
                        pathname: '/my/charge',
                        query: { amt:parseFloat(this.state.amtMoney)-parseFloat(props.account.balance) }
                    })
                }
                return false;
            }

            this.setState({
                overlayShouldShow:false
            })
            //跳到二次确认页
            //userId由prop带下去，其它参数由url带入
            this.context.router.push({
                pathname:`/financial/product/${props.params.productType}/${props.params.id}/confirm`,
                query:{
                    productId:props.params.id,
                    type:props.params.productType,
                    money:this.state.amtMoney,
                    productName:obj.productName,
                    rate:obj.rate,
                    limit:obj.limit

                }
            })
        }
    }
    propPay(obj){
        const props = this.props;
        props.payForProduct({
            type:props.params.productType,
            userId:props.account.userId,
            productId:props.params.id,
            amt:this.state.amtMoney,
            couponId:obj.couponId,
            success:(result)=>{
                obj.success && obj.success(result)

                this.setState({
                    loaded:true,
                    overlayShouldShow:false
                })
                this.context.router.replace({
                    pathname:`/financial/product/${props.params.productType}/${props.params.id}/dealResult`,
                    query:{
                        amt:this.state.amtMoney,
                        sy:this.calculate(this.state.amtMoney,obj.rate,obj.limit),
                        product:obj.productName
                    }
                })
            },
            fail:(result)=>{
                obj.fail && obj.fail(result)

                alert(result.message)
            }
        })
    }
    checkInput(lowestBuy){
        const amtMoney = this.state.amtMoney;
        if(amtMoney < lowestBuy){
            alert(`${lowestBuy}元起投`);

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
