import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadIndex } from 'actions'
import ReactSwipe from 'react-swipe';
import RootLoading from 'RootLoading'
import config from 'containers/componentConfig'
import { browserHistory,Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            selected:1,
            bannerSelected:0
        }
        this.renderMain = this.renderMain.bind(this);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    componentWillMount() {
        //loadData(this.props)
        !this.props.index && this.props.loadIndex()
    }
    renderMain(){
        const {recommend} = this.props.index;
        const banner =[
            {
                img:'/static/img/banner/banner1.jpg',
                link:'#',
                title:''
            },
            {
                img:'/static/img/banner/banner2.jpg',
                link:'#',
                title:''
            },
            {
                img:'/static/img/banner/banner3.jpg',
                link:'#',
                title:''
            },
            {
                img:'/static/img/banner/banner4.jpg',
                link:'#',
                title:''
            },
            {
                img:'/static/img/banner/banner5.jpg',
                link:'#',
                title:''
            }
        ]
        const swipeOptions = {
            continuous: false,
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
                                            <div className={`index-swipe-item ${this.state.selected ==index?'active':''}`}>
                                                <h2 className="tit">{item.name}</h2>
                                                <div className="wave-item" id={`wave-${index}`}>
                                                    <img src="/static/img/wave.gif" />
                                                    <p className="p1">{item.rate}<span>%</span></p>
                                                    <p className="p2">年化收益率</p>
                                                </div>
                                                <div className="item-con-3">
                                                    <span className="s1">起投金额<span>{item.lowestBuy}元</span></span>
                                                    <span className="s2">期限<span>{item.limit}个月</span></span>
                                                </div>
                                                <Link to={`/financial/product/1/${item.productId}`} style={{display:'block'}} className="index-ll-info">
                                                    <div className="button">立即抢购</div>
                                                </Link>
                                            </div>
                                        </section>
                                    )
                                })
                            }
                        </ReactSwipe>
                    </div>
                </section>
            </section>
        )
    }
    componentDidMount(){

    }
    initWave(){
        $('.wave-item').each(function(){
            wave($(this).attr('id'),0.5).start()
        })
    }
    componentWillReceiveProps(nextProps){
       /* var _this = this;
        setTimeout(function(){

            _this.initWave()
        },400)*/
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
function mapStateToProps(state, ownProps) {
    return {
        index:state.index
    }
}

module.exports = connect(mapStateToProps, {
    loadIndex:loadIndex
})(HomePage)
