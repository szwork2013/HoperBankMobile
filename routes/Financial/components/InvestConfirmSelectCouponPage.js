import React, { Component, PropTypes } from 'react'
import {BaseButton,TextButton} from 'components/Button'
import { browserHistory } from 'react-router'
export default class InvestConfirmSelectCouponPage extends Component{
    constructor(props) {
        super(props)
        this.renderType2 = this.renderType2.bind(this)
        this.state={
            selected:props.couponSelected || null
        }
    }
    componentWillMount(){
        
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
        if(data && data.length!==0){
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
        if(data && data.length!==0){
            let arr =[];
            data.map((item,index)=>{
                arr.push(
                    <div className="select-coupon-item" key={index} onClick={()=>{ this.setState({selected:item.couponId});this.props.selectCoupon(item.couponId,item.money);browserHistory.goBack()}}>
                        <div className="select-coupon-selector">
                            <div className={`${this.state.selected==item.couponId? 'selected':''}`}></div>
                        </div>
                        <div className={`coupon-type-2`}>
                            <div className="part-1">
                                <img src="/static/img/coupon_type2_bg_2.png"/>
                                <div>
                                    <p>有效时间：{item.validTime}</p>
                                    <p>适用范围：{item.scope}</p>
                                    <p>使用条件：{item.condition}</p>
                                </div>
                            </div>
                            <div className="part-2">
                                <img src="/static/img/coupon_type2_bg_1.png"/>
                                <div>
                                    <p className="p1">{item.money}</p>
                                    <p className="p2">加息券</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            return arr;
        }else{
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
