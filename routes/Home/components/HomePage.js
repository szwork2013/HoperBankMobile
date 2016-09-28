import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadIndex } from 'actions'
import ReactSwipe from 'react-swipe';
import RootLoading from 'RootLoading'
import config from 'container/componentConfig'
import { browserHistory,Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            selected:1,
            bannerSelected:0
        }
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.renderMain = this.renderMain.bind(this);
    }

    componentWillMount() {
        //loadData(this.props)
        !this.props.index && this.props.loadIndex()
    }
    next() {
        this.refs.reactSwipe.next();
    }

    prev() {
        this.refs.reactSwipe.prev();
    }

    renderMain(){
        const {recommend} = this.props.index;
        const banner =[
            {
                img:'/static/img/banner3.jpg',
                link:'http://m.hoperbank.com/activity20160617.html',
                title:''
            },
            {
                img:'/static/img/banner5.jpg',
                link:'#',
                title:''
            },
            {
                img:'/static/img/banner4.jpg',
                link:'#',
                title:''
            }
        ]
        const swipeOptions = {
            continuous: true,
            callback:(index,elm)=>{
                this.setState({
                    selected:index
                })
            },
            startSlide:1
        }
        return (
            <section style={{backgroundColor:'#fff'}}>
                <div className="carousel">
                    <ReactSwipe
                        swipeOptions={
                                {
                                    continuous: true,
                                    auto: 3000,
                                    callback:(index,elm)=>{
                                        this.setState({
                                            bannerSelected:index
                                        })
                                    }
                                 }
                            }
                    >
                        {
                            banner.map((item,index)=>{
                                return(
                                    <div className="swiper-slide" key={index}>
                                        <section className="banner"><a href={item.link}><img src={item.img} /></a></section>
                                    </div>
                                )
                            })
                        }
                    </ReactSwipe>
                    <div className="carousel-dots">
                        {
                            banner.map((item,index)=>{
                                return(
                                    <div className={`dot ${this.state.bannerSelected===index && 'active'}`} key={index}></div>
                                )
                            })
                        }
                    </div>
                </div>
                <section className="index-nav-list">
                    <ul>
                        <li>
                            <Link to="/activity">
                                <img src="/static/img/index-icon2.png" width="20" height="20" />
                                <div>
                                    <p className="p1">活动中心</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/safe">
                                <img src="/static/img/index-icon1.png" width="20" height="20" />
                                <div>
                                    <p className="p1">安全保障</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/myteam'>

                                <img src="/static/img/index-icon3.png" width="20" height="20" />
                                <div>
                                    <p className="p1">团队</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </section>
                <section className="index-ll-wrapper">
                    <div className="swiper-container contentSwiper">
                        <ReactSwipe className="carousel swiper-wrapper" ref="reactSwipe" swipeOptions={swipeOptions}>
                            {
                                recommend.map((item,index)=>{
                                    return(
                                        <section className="index-ll-content" key={index}>
                                            <div className="index-ll-bg">
                                                <h2 className="tit">{item.name}</h2>
                                                <p className="p1"><span className="rate">{item.rate}</span><span>%</span></p>
                                                <p className="p2">预期年化收益率</p>
                                                <p className="p3">{item.lowestBuy+'元起投'}</p>
                                            </div>
                                            <Link to={`/financial/product/1/${item.productId}`} style={{display:'block'}} className="index-ll-info">
                                                <div className="d1">立即抢购</div>
                                            </Link>
                                        </section>
                                    )
                                })
                            }
                        </ReactSwipe>
                        <div className="swiper-button-prev" onClick={this.prev}>
                            <i className="icon icon-arrow-left-4"></i>
                        </div>
                        <div className="swiper-button-next" onClick={this.next}>
                            <i className="icon icon-arrow-right-4"></i>
                        </div>
                    </div>
                </section>
                <section className="index-date-line">
                    <ul>
                        {
                            recommend.map((item,index)=>{
                                return(
                                    <li key={index} style={{width:Math.floor(100/recommend.length) +'%'}} className={this.state.selected == index ? 'active':''}><i></i>{item.limit}个月</li>
                                )
                            })
                        }
                    </ul>
                </section>
            </section>
        )
    }

    render() {
        return (
            <section className="home-page">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {this.props.children}
                </ReactCSSTransitionGroup>
                <RootLoading display={!this.props.index}/>
                {this.props.index && this.renderMain()}
            </section>
        )
    }
}
HomePage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        index:state.index
    }
}

module.exports = connect(mapStateToProps, {
    loadIndex:loadIndex
})(HomePage)
