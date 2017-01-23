import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe';
import { connect } from 'react-redux'
import {fetchGiftList} from 'actions'
import config from 'componentConfig'
class GiftList extends Component{
    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        props.fetchGiftList({
            userId:props.account.userId,
            type:props.type,
            couponType:props.couponType,
            callback:()=>{

            }
        })
    }
    renderItem(couponType,type,item,index){
        if(couponType==3){
            return (
                <div className={`gift-list-item type${type} animated flipInX`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                    <div className="part-left">
                        <p>{parseInt(item.money)}<span>元</span></p>
                        <img src={type==3? `/static/img/coupon/red_packets_n_l.png` :`/static/img/coupon/red_packets_n_r.png`} />
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
                    <div className="abs">{type==3? '已过期':'已使用'}</div>
                </div>
            )
        }

        if(couponType==1){
            return (
                <div className={`gift-list-item type${type} animated flipInX`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                    <div className="part-left">
                        <p>{item.money}<span>%</span></p>
                        <img src={type==3? `/static/img/coupon/coupon_l_out.png` :`/static/img/coupon/coupon_l.png`} />
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
                    <div className="abs">{type==3? '已过期':'已使用'}</div>
                </div>
            )
        }
    }
    render(){
        const iScrollHeight = config.windowHeight - config.tabBarHeight;
        const couponType = this.props.couponType;
        const type = this.props.type;
        return(
            <ReactIScroll iScroll={iScroll}
                          style={{height:iScrollHeight,overflow:'hidden'}}
            >
                    <div>
                        {
                            this.props.giftList.map((item,index)=>{
                                return this.renderItem(couponType,type,item,index)
                            })
                        }
                        {
                            this.props.giftList.length===0 && <p className="no-record">没有记录</p>
                        }
                    </div>

            </ReactIScroll>

        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        giftList:state.user.gift.list
    }
}

export default connect(mapStateToProps, {
    fetchGiftList
})(GiftList)
