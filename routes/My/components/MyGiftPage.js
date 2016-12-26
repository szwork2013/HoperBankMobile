import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {fetchGift} from 'actions'
import RootLoading from 'components/RootLoading'
import IconButton from 'IconButton'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class MyGiftPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
        this.jumpTo = this.jumpTo.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        props.fetchGift({
            userId:props.account.userId,
            callback:()=>{
                this.setState({
                    loaded:true
                })
            }
        })
    }
    jumpTo(link){
        this.context.router.push(link)
    }
    render() {
        const props = this.props;
        return (
            <section className="level-2-wrap">
                <RootLoading display={!this.state.loaded}/>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        props.children
                    }
                </ReactCSSTransitionGroup>
                <section className="my-btn-wrap coupon-wrap">
                    {
                        props.gift.map((item,index)=>{
                            const couponName = '';
                            return(
                                <IconButton key={index} text={item.name} hasBorder={!(index===2)}
                                            icon={`icon-coupon-${index+1}`}
                                            arrowText={item.usable >0? `${item.usable}张` : ''}
                                            onClick={()=>{this.jumpTo(`/my/myGift/list/${item.couponType}`)}}  />
                            )
                        })
                    }
                </section>


            </section>
        )
    }
}
MyGiftPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        gift:state.user.gift.preview
    }
}

export default connect(mapStateToProps, {
    fetchGift
})(MyGiftPage)
/*
 <Link className="gift-list-item" to={`/my/myGift/list/${item.couponType}`} key={index}>
 <div className="part-left">
 <div className={'abs ' + (item.couponType==3?'':'ab2')}>{item.couponType==3?'':'券'}</div>
 <p className="name">{item.name}</p>
 </div>
 <div className="part-right">
 <p>
 <span>可用</span>
 <span>已用</span>
 <span>过期</span>
 </p>
 <p>
 <span className="s1">{item.usable}</span>
 <span className="s2">{item.used}</span>
 <span className="s3">{item.expire}</span>
 </p>
 <div className="abs"></div>
 </div>
 </Link>*/
