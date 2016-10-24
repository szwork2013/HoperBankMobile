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
                <div className={`gift-list-item-2 type${type} animated flipInX`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                    <div className="part-left">
                        <h3>{item.name}</h3>
                        <p>有效时间：{item.validTime}</p>
                        <p>适用范围：{item.scope}</p>
                        <p>使用条件：{item.condition}</p>
                    </div>
                    <div className="abs">{parseInt(item.money)}</div>
                </div>
            )
        }

        if(couponType==1){
            return (
                <div className={`gift-item coupon-type-2 type${type}  animated flipInX`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                    <div className="part-1">
                        <img src={`/static/img/coupon_type${type==3? 3 : 1}_bg_2.png`}/>
                        <div>
                            <p>有效时间：{item.validTime}</p>
                            <p>适用范围：{item.scope}</p>
                            <p>使用条件：{item.condition}</p>
                        </div>
                    </div>
                    <div className="part-2">
                        <img src={`/static/img/coupon_type${type}_bg_1.png`}/>
                        <div>
                            <p className="p1">{item.money}</p>
                            <p className="p2">加息券</p>
                        </div>
                    </div>
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
