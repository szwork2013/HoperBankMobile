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
                <div className={`gift-list-item type1 animated flipInX`} >
                    <div className="part-left">
                        <p>{parseInt(data.money)}<span>元</span></p>
                        <img src={`/static/img/coupon/red_packets_n_r.png`} />
                    </div>
                    <div className="part-right">
                        <div className="info">
                            <h3>{data.name}</h3>
                            <p>{data.scope}</p>
                            <p className="red">{data.condition}</p>
                            <p>有效期{data.validTime}</p>
                        </div>
                        <img src="/static/img/coupon/coupon_r.png" />
                    </div>
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
                        <div className={`gift-list-item type1 animated flipInX`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                            <div className="part-left">
                                <p>{parseInt(item.money)}<span>%</span></p>
                                <img src={`/static/img/coupon/coupon_l.png`} />
                            </div>
                            <div className="part-right">
                                <div className="info">
                                    <h3>{item.name}</h3>
                                    <p>{item.scope}</p>
                                    <p className="red">{item.condition}</p>
                                    <p>有效期{item.validTime}</p>
                                </div>
                                <img src="/static/img/coupon/coupon_r.png" />
                            </div>
                            <div className="abs">已使用</div>
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
                {props.params.type==3 && this.renderNull()}
            </section>
        )
    }
}
InvestConfirmSelectCouponPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
