import React, { Component, PropTypes } from 'react'
import RootLoading from '../components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {BaseButton,TextButton} from '../components/Button'
export default class InvestConfirmSelectCouponPage extends Component{
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const props = this.props;

    }
    componentWillReceiveProps(nextProps){
    }
    renderNull(){
        return(
            <div style={{marginTop:'100px'}}>
                <p style={{textAlign:'center',color:'#333'}}>很遗憾</p>
                <p style={{textAlign:'center',color:'#666'}}>您暂无可以使用的优惠券</p>
            </div>
        )
    }
    renderType1(data){
        if(data){
            return(
                <div className={`gift-list-item-2 type1`}>
                    <div className="part-left">
                        <h3>{data.name}</h3>
                        <p>有效时间：{data.validTime}</p>
                        <p>适用范围：{data.scope}</p>
                        <p>使用条件：{data.condition}</p>
                    </div>
                    <div className="abs">{parseInt(data.money)}</div>
                </div>
            )
        }else{
            return this.renderNull()
        }

    }
    renderType2(data){
        if(data.length === 0){
            return this.renderNull()
        }
    }
    render(){
        const props = this.props;
        return(
            <section className="level-2-wrap">
                {props.params.type==1 && this.renderType1(this.props.coupon.type1)}
                {props.params.type==2 && this.renderType2(this.props.coupon.type2)}
            </section>
        )
    }
}
InvestConfirmSelectCouponPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
