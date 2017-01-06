import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import IconButton from 'IconButton'
import TabBar,{TabBarItem} from 'components/TabBar'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'
import ImageViewer from 'components/ImageViewer'
const honorData = [
    {
        title:'第十九届洽投会--2016中国互联网行业规范与创新论坛支持单位',
        date:'20169*101',
        src:'/static/img/discover/certificatedetails01.jpg'
    },
    {
        title:'2016中国互联网金融优秀企业',
        date:'20169*101',
        src:'/static/img/discover/certificatedetails02.jpg'
    },
    {
        title:'第十九届洽投会--2016中国互联网行业规范与创新论坛特邀嘉宾',
        date:'20169*101',
        src:'/static/img/discover/certificatedetails03.jpg'
    },
    {
        title:'中国互联网金融行业优秀示范企业',
        date:'20169*101',
        src:'/static/img/discover/certificatedetails04.jpg'
    },
    {
        title:'诚信网站',
        date:'20169*101',
        src:'/static/img/discover/certificatedetails05.jpg'
    }
]
export default class AboutUsPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            viewImageState:false,
            viewImageSrc:'',
            viewText:false
        }
        this.showImage = this.showImage.bind(this);
    }
    componentWillMount(){
    }
    showImage(src,text){
        return ()=>{
            this.setState({
                viewImageState:true,
                viewImageSrc:src,
                viewText:text||false
            })
        }
    }
    render() {

        return (
            <section className="level-2-wrap absolute about-wrap">
                <ImageViewer onClick={()=>this.setState({viewImageState:false})} text={this.state.viewText} display={this.state.viewImageState} src={this.state.viewImageSrc} />
                <TabBar>
                    <TabBarItem name="琥珀介绍" >
                        <Introduce showImage={this.showImage} />
                    </TabBarItem>
                    <TabBarItem name="荣誉资质">
                        <HonorPage data={honorData} showImage={this.showImage} />
                    </TabBarItem>
                </TabBar>
            </section>
        )
    }
}
AboutUsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
/*
module.exports = DiscoverPage*/
const Introduce = (props)=>{
    var options={
        scrollX: true,
        scrollY: false
    }
    return (
        <ReactIScroll iScroll={iScroll}>
            <div className="introduce-wrap">
                <img src="/static/img/imagview_logo.png" />
                <p>
                    深圳市鹏泰联盛互联网金融服务有限公司旗下平台——琥珀金服，成立于2015年6月，总部位于深圳福田金融中心，核心团队均由知名金融机构、互联网行业专业人士组成，分支机构已辐射到广州、珠海、福州、杭州、衢州、宁波等地。
                </p>
                <p>
                    琥珀金服以创新的运营管理模式琥珀金服以创新的运营管理模式，顶尖的风控管理团队，结合业内首创的“E盾”保障体系，甄选优质资产，坚持小额分散、双向打散的原则，为客户提供安全、便捷的金融中介服务。琥珀金服互联网金融平台在业内率先采用中介撮合运营模式，以资金流向完全清晰透明为导向，将传统的小贷市场产品网络化、普及化，在为客户提供“及时、快捷、优质”的资金解决方案的同时，为广大投资人拓宽投资渠道、实现收益最大化。
                </p>
                <ReactIScroll iScroll={iScroll} options={options}>
                    <div className="introduce-img-wrap">
                        <img src="/static/img/discover/company_profile_a.jpg" onClick={props.showImage('/static/img/discover/company_profile_a.jpg')} />
                        <img src="/static/img/discover/company_profile_b.jpg" onClick={props.showImage('/static/img/discover/company_profile_b.jpg')} />
                        <img src="/static/img/discover/company_profile_c.jpg" onClick={props.showImage('/static/img/discover/company_profile_c.jpg')} />
                        <img src="/static/img/discover/company_profile_d.jpg" onClick={props.showImage('/static/img/discover/company_profile_d.jpg')} />
                    </div>
                </ReactIScroll>
            </div>
        </ReactIScroll>
    )
}
const HonorPage = (props)=>{
    return (
        <ReactIScroll iScroll={iScroll}>
            <div className="honor-wrap">
                {
                    props.data.map((item,index)=>{
                        return <div className="news-item" key={index} >
                            <div className="part-left">
                                <h3>{item.title}</h3>
                                <p>{item.date}</p>
                            </div>
                            <div className="part-right">
                                <img src={item.src} onClick={props.showImage(item.src,item.title)} />
                            </div>
                        </div>
                    })
                }
            </div>
        </ReactIScroll>
    )
}
