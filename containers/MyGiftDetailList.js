import React, { Component, PropTypes } from 'react'
import ListView from '../components/ListView'
import { connect } from 'react-redux'
import {fetchGiftList} from '../actions'
class GiftList extends Component{
  constructor(props) {
    super(props)
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
  render(){
    return(
        <div>
          {
            this.props.giftList.map((item,index)=>{
              return(
                  <div className={`gift-list-item-2 type${item.type}`} key={index}>
                    <div className="part-left">
                      <h3>{item.name}</h3>
                      <p>有效时间：{item.validTime}</p>
                      <p>适用范围：{item.scope}</p>
                      <p>使用条件：{item.condition}</p>
                    </div>
                    <div className="abs">{parseInt(item.money)}</div>
                  </div>
              )
            })
          }
          {
            this.props.giftList.length===0 && <p className="no-record">没有记录</p>
          }
        </div>

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
