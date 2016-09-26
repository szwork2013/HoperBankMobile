import React, { Component, PropTypes } from 'react'
import RootLoading from 'components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { browserHistory } from 'react-router'
import {BaseButton,TextButton} from 'components/Button'
export default class InvestConfirmPage extends Component{
    constructor(props) {
        super(props)
        this.state={
            coupon:{
                type1:null,
                type2:[],
                type3:[]
            },
            loading:false
        }
    }
    componentWillMount() {
        const props = this.props;
        if(!props.location.query.productId){
            browserHistory.goBack()
            return false;
        }
        var type = 1;
        switch (parseInt(props.location.query.type)){
            case 1:
                type=1;
                break;
            case 9:
                type=2;
                break;
            case 5:
                type=3;
                break;
        }
        props.fetchConfirmPageCoupon({
            userId:props.userId,
            productId:props.location.query.productId,
            money:props.location.query.money,
            type:type,
            callback:(result)=>{
                if(result.r==1){
                    this.setState({
                        coupon:{
                            type1:result.data.redPaper || null,
                            type2:result.data.usableList
                        }
                    })
                }
            }
        })
    }
    componentWillReceiveProps(nextProps){
    }
    calculate(type,money,rate,time){
        if(type==1){
            return (parseFloat( money * rate / 100 / 12 * time) || 0).toFixed(2);
        }else{
            return (money * (rate / 100 / 12) * Math.pow(1 + (rate / 100 / 12), time) / (Math.pow(1 + (rate / 100 / 12), time) - 1) * time - money).toFixed(2);
        }

    }
    render(){
        const props = this.props;
        const params = props.location.query;
        return(
            <section className="level-2-wrap" style={{zIndex:9999}}>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>

                    {this.props.children  && React.cloneElement(this.props.children, {
                        coupon:this.state.coupon
                    })}

                </ReactCSSTransitionGroup>
                <RootLoading display={this.state.loading} />
                <div className="invest-confirm-wrap">
                    <div className="invest-confirm-information">
                        <p className="p1">{params.productName}</p>
                        <p className="p2"><span className="s1">年化收益</span><span className="s2">投资期限</span></p>
                        <p className="p3"><span className="s1">{params.rate}%</span><span className="s2">{params.limit}期</span></p>
                    </div>
                    <div className="invest-confirm-content">
                        <TextButton text="投资金额" onClick={()=>{
                        }}  hasBorder={true} hasIcon={false} rightText={`${params.money}元`} />

                        <TextButton text="红包返现" onClick={()=>{
                            this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/confirm/coupon/1`)
                        }}  hasBorder={true}  rightText={this.state.coupon.type1 ? `${this.state.coupon.type1.money}元` : '无可用'} hasIcon={true} />

                        <TextButton text="加息卡" onClick={()=>{
                            this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/confirm/coupon/2`)
                        }}  hasBorder={true}  rightText={this.state.coupon.type2 && this.state.coupon.type2.length>0?'':'无可用'} hasIcon={true} />

                        <TextButton text="抵用券" onClick={()=>{
                           this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/confirm/coupon/3`)
                        }}  hasBorder={false}  rightText="无可用" hasIcon={true} />

                        <TextButton text="应投金额" onClick={()=>{

                        }}  hasBorder={false} hasIcon={false} rightText={`${params.money}元`} style={{marginTop:'20px'}} />

                        <p style={{width:'90%',margin:'15px auto 0 auto'}}>预计收益<span className="money">{this.calculate(props.params.productType,params.money,params.rate,params.limit)}</span>元</p>

                        <BaseButton text="确认投资" className="invest-confirm-pay" onClick={()=>{
                            this.setState({
                                loading:true
                            })
                            props.propPay({
                                productName:params.productName,
                                rate:params.rate,
                                limit:params.limit,
                                success:()=>{
                                    this.setState({
                                        loading:false
                                    })
                                },
                                fail:()=>{
                                    this.setState({
                                        loading:false
                                    })
                                }
                            })
                        }} />
                    </div>
                </div>
            </section>
        )
    }
}
InvestConfirmPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
