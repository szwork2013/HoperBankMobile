import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadIndex } from '../actions'
import ReactSwipe from 'react-swipe';
import Loading from '../components/RootLoading'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state={
      selected:1
    }
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderMain = this.renderMain.bind(this);
  }

  componentWillMount() {
    //loadData(this.props)
    this.props.loadIndex()

  }
  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {

  }
  renderLoading(){
    return(
        <Loading className={this.props.index && 'loading-fade-out'}></Loading>
    )
  }
  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  renderMain(){
    const {banner,recommend} = this.props.index
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
        <section>
          <ReactSwipe className="carousel" swipeOptions={{continuous: true,auto: 2000}}>
            {
                banner.map((item,index)=>{
                  return(
                      <div className="swiper-slide" key={index}>
                        <section className="banner"><a href="activity20160617.html"><img src={'http://oss-cn-shenzhen.aliyuncs.com/hopertest/'+item.link} /></a></section>
                      </div>
                  )
                })
            }
            <div className="swiper-slide">
              <section className="banner"><a href="activity20160617.html"><img src="http://m.hoperbank.com/img/banner3.jpg" /></a></section>
            </div>
          </ReactSwipe>
          <section className="index-nav-list">
            <ul>
              <li>
                <a href="activityCenter.html">
                  <img src="/static/img/index-icon1.png" width="30" height="30" />
                  <div>
                    <p className="p1">活动</p>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <img src="/static/img/index-icon2.png" width="30" height="30" />
                  <div>
                    <p className="p1">收益</p>
                  </div>
                </a>
              </li>
              <li>
                <a id="myteamLink">
                  <img src="/static/img/index-icon3.png" width="30" height="30" />
                  <div>
                    <p className="p1">团队</p>
                  </div>
                </a>
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
                          <a style={{display:'block'}} href="product.html?productId=10001" className="index-ll-bg">
                            <h2 className="tit">{item.name}</h2>
                            <p className="p1">{item.rate}<span>%</span></p>
                            <p className="p2">预期年化收益率</p>
                            <p className="p3">立即抢购</p>
                          </a>
                          <div className="index-ll-info">
                            <div className="d1" style={{width:'100%',textAlign:'center'}}>起购金额<span>{item.lowestBuy}元</span></div>
                          </div>
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

export default connect(mapStateToProps, {
  loadIndex:loadIndex
})(HomePage)
