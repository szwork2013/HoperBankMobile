import React, { Component, PropTypes } from 'react'
import RootLoading from '../components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {BaseButton,TextButton} from '../components/Button'
export default class InvestConfirmPage extends Component{
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const props = this.props;
        props.fetchConfirmPageCoupon({
            userId:props.userId,
            productId:props.location.query.productId,
            money:props.location.query.money,
            type:props.location.query.type,
            callback:(result)=>{
                console.log(result)
            }
        })
    }
    componentWillReceiveProps(nextProps){
    }
    calculate(money,rate,time){
        return (parseFloat( money * rate / 100 / 12 * time) || 0).toFixed(2);
    }
    render(){
        return(
            <section className="level-2-wrap" style={{zIndex:9999}}>
                <div className="invest-confirm-wrap">
                    <div className="invest-confirm-information">
                        <p className="p1">悦利宝</p>
                        <p className="p2"><span className="s1">年化收益</span><span className="s2">投资期限</span></p>
                        <p className="p3"><span className="s1">14%</span><span className="s2">24期</span></p>
                    </div>
                    <div className="invest-confirm-content">
                        <TextButton text="投资金额" onClick={()=>{
                            this.context.router.push(`/financial/product/1/${this.props.params.id}/record`)
                        }}  hasBorder={true} hasIcon={false} rightText="1000元" />
                        <TextButton text="红包返现" onClick={()=>{
                            this.context.router.push(`/financial/product/1/${this.props.params.id}/record`)
                        }}  hasBorder={true}  rightText="无可用" hasIcon={true} />
                        <TextButton text="加息卡" onClick={()=>{
                            this.context.router.push(`/financial/product/1/${this.props.params.id}/record`)
                        }}  hasBorder={true}  rightText="无可用" hasIcon={true} />
                        <TextButton text="抵用券" onClick={()=>{
                            this.context.router.push(`/financial/product/1/${this.props.params.id}/record`)
                        }}  hasBorder={false}  rightText="无可用" hasIcon={true} />

                        <TextButton text="应投金额" onClick={()=>{
                            this.context.router.push(`/financial/product/1/${this.props.params.id}/record`)
                        }}  hasBorder={false} hasIcon={false} rightText="1000元" style={{marginTop:'20px'}} />

                        <BaseButton text="确认投资" className="invest-confirm-pay" onClick={()=>{

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
