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
            couponId:'',
            couponTxt:null,
            loading:false,
            queryState:props.location.state
        }
        this.selectCoupon = this.selectCoupon.bind(this);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    static propTypes = {
        fetchConfirmPageCoupon:PropTypes.func.isRequired
    }
    componentWillMount() {
        const props = this.props;
        //const queryState = this.state.queryState;
        const queryState = props.location.query;
        if(!props.location.query.productName){
            this.context.router.replace(`/financial/product/${props.params.productType}/${props.params.id}`)
            return false;
        }
        var type = 1;
        switch (parseInt(queryState.type)){
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
            productId:queryState.productId,
            money:queryState.money,
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
        /*if(!this.state.queryState){
            this.context.router.replace(`/financial/product/${nextProps.params.productType}/${nextProps.params.id}`)
        }*/
        //console.log(nextProps)
    }
    calculate(type,money,rate,time){
        if(type==1){
            return (parseFloat( money * rate / 100 / 12 * time) || 0).toFixed(2);
        }else{
            return (money * (rate / 100 / 12) * Math.pow(1 + (rate / 100 / 12), time) / (Math.pow(1 + (rate / 100 / 12), time) - 1) * time - money).toFixed(2);
        }

    }
    selectCoupon(id,txt){
        this.setState({
            couponId:id,
            couponTxt:txt
        })
    }
    showCouponType2(){
        if(this.state.couponTxt){
            return this.state.couponTxt;
        }
        if(this.state.coupon.type2 && this.state.coupon.type2.length){
            return this.state.coupon.type2.length + '张可用';
        }
        return '无可用'
    }
    render(){
        const props = this.props;
        //const params = this.state.queryState;
        const params = props.location.query;
        return(
            <section className="level-2-wrap" style={{zIndex:9999}}>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>

                    {this.props.children  && React.cloneElement(this.props.children, {
                        coupon:this.state.coupon,
                        selectCoupon:this.selectCoupon,
                        couponSelected:this.state.couponId || null
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
                        }}  hasBorder={true} hasIcon={false}
                                    rightTextClass="money"
                                    rightText={`${params.money}元`} />

                        <TextButton text="预计收益" onClick={()=>{
                        }}  hasBorder={true} hasIcon={false}
                                    rightTextClass="money"
                                    rightText={`${this.calculate(props.params.productType,params.money,params.rate,params.limit)}元${this.state.couponTxt ? ',加息新增'+this.calculate(props.params.productType,params.money,parseFloat(this.state.couponTxt.replace('%','')),params.limit)+'元':'' }`} />

                        <TextButton text="红包返现" onClick={()=>{
                            this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/confirm/coupon/1`)
                        }}  hasBorder={true}  rightText={this.state.coupon.type1 ? `${this.state.coupon.type1.money}元` : '无可用'} hasIcon={true} />

                        <TextButton text="加息卡" onClick={()=>{
                            this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/confirm/coupon/2`)
                        }}  hasBorder={true}  rightText={this.showCouponType2.bind(this)()} hasIcon={true} />

                        <TextButton text="投资抵扣" onClick={()=>{
                           this.context.router.push(`/financial/product/${props.params.productType}/${props.params.id}/confirm/coupon/3`)
                        }}  hasBorder={false}  rightText="无可用" hasIcon={true} />

                        <TextButton text="应投金额" onClick={()=>{

                        }}  hasBorder={false} hasIcon={false} rightText={`${params.money}元`}
                                    rightTextClass="money"
                                    style={{marginTop:'20px'}} />

                        <BaseButton text="确认投资" className="invest-confirm-pay" onClick={()=>{
                            this.setState({
                                loading:true
                            })
                            props.payForProduct({
                                productId:props.params.id,
                                amt:params.money,
                                couponId:this.state.couponId,
                                type:props.params.productType,
                                success:()=>{
                                    this.setState({
                                        loading:false
                                    })
                                    this.context.router.replace({
                                        pathname:`/financial/product/${props.params.productType}/${props.params.id}/dealResult`,
                                        state:{
                                            amt:params.money,
                                            sy:this.calculate(props.params.productType,params.money,params.rate,params.limit),
                                            product:params.productName,
                                            couponSy:this.state.couponTxt ? this.calculate(props.params.productType,params.money,parseFloat(this.state.couponTxt.replace('%','')),params.limit) : ''
                                        }
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
