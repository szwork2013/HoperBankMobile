import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe';
import { connect } from 'react-redux'
import {fetchLCList,payForProduct} from '../actions'
import RootLoading from '../components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {BaseButton,TextButton} from '../components/Button'
import Overlay from '../components/Overlay'
var arr = [0,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000]
class InvestPage1 extends Component{
    constructor(props) {
        super(props)
        this.state={
            scrollX:750.2,
            data:arr,
            ableAdd:true,
            amtMoney:10000,
            loaded:false,
            overlayShouldShow:false,
            canSubmit:true
        }
        this.onScroll = this.onScroll.bind(this);
        this.amtMoneyChange = this.amtMoneyChange.bind(this);
    }
    componentWillMount() {
        //隐藏navigator
        setTimeout(()=>{
            $('.main-foot-nav').fadeOut();
        },200)


        //如果store中没有理财产品信息就去执行ajax更新
        const props = this.props;
        if(props.product.length===0){
            props.fetchLCList(()=>{
                this.setState({
                    loaded:true
                })
            })
        }else{
            this.setState({
                loaded:true
            })
        }
    }
    componentWillUnmount(){
        $('.main-foot-nav').fadeIn(200);
    }
    onScroll(ins){

        this.setState({
            amtMoney:(Math.abs(ins.x * 13.33)).toFixed(0),
            canSubmit:true
        })
        if(this.state.ableAdd){

            console.log(Math.abs(ins.x)> (Math.abs(ins.maxScrollX)-100))
            if(Math.abs(ins.x)> (Math.abs(ins.maxScrollX)-100)){
                this.setState({
                    ableAdd:false
                });
                setTimeout(()=>{
                    arr.push((arr.length)*1000)
                    arr.push((arr.length)*1000)
                    arr.push((arr.length)*1000)
                    arr.push((arr.length)*1000)
                    arr.push((arr.length)*1000)
                    this.setState({
                        data:arr,
                        ableAdd:true
                    })
                },100)
            }

        }

    }
    amtMoneyChange(ins){
        const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/g
        this.setState({
            amtMoney:ins.target.value,
            canSubmit:reg.test(ins.target.value)
        })

    }
    calculate(money,rate,time){
        return (parseFloat( money * rate / 100 / 12 * time) || 0).toFixed(2);
    }
    render(){
        const options = {mouseWheel: false, scrollbars: false, scrollX: true,probeType: 2,momentum:false,startX:-750}
        var data = {
            rate:0,
            limit:0,
            productId:0,
            name:'悦利宝'
        };
        this.props.product.map((item,index)=>{
            if(item.productId == this.props.params.id){
                return data = item;
            }
        });
        const show={
            transform:`translate(0,-${$(this.refs.shoppingWindow).outerHeight()}px)`
        }
        const hide={
            transform:'translate(0,0)'
        }
        return(
            <section className="level-2-wrap absolute">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <RootLoading display={!this.state.loaded}/>
                <section className="product-wrap">
                    <div className="ll">
                        <p className="p1">
                            <span className="s1" id="rate">{data.rate}</span>
                            <span className="s2">%</span>
                        </p>
                        <p className="p2">
                            预计年化收益率
                        </p>
                    </div>
                    <div className="account-wrap">
                        <div>
                            <p className="p1">投资期限</p>
                            <p className="p2"><span id="date">{data.limit}</span>期</p>
                            <div className="line-2"></div>
                        </div>
                        <div>
                            <p className="p1">起投金额(元)</p>
                            <p className="p2">100</p>
                            <div className="line-2"></div>
                        </div>
                        <div>
                            <p className="p1">账户余额(元)</p>
                            <p className="p2" id="balance">{this.props.account.balance}</p>
                        </div>
                    </div>
                </section>

                <ReactIScroll iScroll={iScroll}
                              options={options}
                    // onScrollEnd={this.onScrollEnd}
                    //onRefresh={this.onRefresh}
                              onScroll={this.onScroll}
                    //onScrollStart={this.onScrollStart}
                              style={{height:'150px',backgroundColor:'#fff',position:'relative'}}
                >
                    <div className="product-scroll-wrap" style={{width:(this.state.data.length+3)*75}}>
                        <ul>
                            {
                                this.state.data.map((item,index)=>{
                                    if(index===0){
                                        return(
                                            <li key={index} style={{marginLeft:$(window).width()/2 - 38}}><span>{item}</span></li>
                                        )
                                    }
                                    return(
                                        <li key={index}><span>{item}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="product-scroll-abs-box" style={{left:($(window).width()-160)/2}}>
                        <p>我要买(元)</p>
                        <p className="p2"><input type="text" id="invest_input" onChange={this.amtMoneyChange} value={this.state.amtMoney} /></p>
                        <div className="line"></div>
                    </div>
                </ReactIScroll>
                <section className="product-s1-wrap">
                    <div className="product-s1 fl">
                        <i className="icon i1"></i>
                        <p>预期收益(元)</p>
                        <p className="money" id="profit1">{this.calculate(this.state.amtMoney,data.rate,data.limit)}</p>
                    </div>
                    <div className="product-s1 fr">
                        <i className="icon i2"></i>
                        <p>银行收益(元)</p>
                        <p className="money" id="profit2">{this.calculate(this.state.amtMoney,2.75,data.limit)}</p>
                    </div>
                </section>
                <section className="index-date-line" style={{backgroundColor:'#fff'}}>
                    <ul>
                        <li style={{width:'25%'}}>
                            <i></i>
                            <p>确认金额</p>
                        </li>
                        <li style={{width:'25%'}}>
                            <i></i>
                            <p>系统匹配</p>
                        </li>
                        <li style={{width:'25%'}}>
                            <i></i>
                            <p>产生收益</p>
                        </li>
                        <li style={{width:'25%'}}>
                            <i></i>
                            <p>到期赎回</p>
                        </li>
                    </ul>
                </section>
                <section className="product-button-wrap">
                    <TextButton text="产品详情" onClick={()=>{
                        this.context.router.push(`/financial/product1/${this.props.params.id}/detail`)
                    }} />
                    <TextButton text="投标记录" onClick={()=>{
                        this.context.router.push(`/financial/product1/${this.props.params.id}/record`)
                    }}  hasBorder={false} />
                </section>
                <Overlay display={this.state.overlayShouldShow} onClick={()=>{
                    this.setState({
                        overlayShouldShow:false
                    })
                }} />
                <BaseButton className="fixed" text="立即购买" onClick={()=>{
                    this.setState({
                        overlayShouldShow:true
                    })
                }} />
                <div className={"shopping-window "} style={this.state.overlayShouldShow ? show : hide } ref="shoppingWindow">
                    <h3>投资项目:<span>{data.name}</span></h3>
                    <div className="input-wrap">
                        <span className="input-wrap-text-1">投资金额</span>
                        <span className="input-wrap-2">
                            <input type="text" value={this.state.amtMoney} onChange={this.amtMoneyChange}/>元</span>
                    </div>
                    <div className="input-wrap">
                        <span className="input-wrap-text-1">预期收益</span>
                        <span className="input-wrap-2">
                            {this.calculate(this.state.amtMoney,data.rate,data.limit)}元</span>

                    </div>
                    <BaseButton text="确认" className={this.state.canSubmit ? '' : 'disabled'}
                                disabled={!this.state.canSubmit}
                                style={{width:'100%',marginTop:'10px'}} onClick={this.doPay.bind(this)} />

                </div>
            </section>
        )
    }
    doPay(){
        const props = this.props;
        if(!props.account.userId){
            let r = confirm("请先登录");
            if(r){
                this.context.router.push(`/login`)
            }
            return false;
        }
        if(this.checkInput()){
            this.setState({
                loaded:false
            })
            props.payForProduct({
                type:1,
                userId:props.account.userId,
                productId:props.params.id,
                amt:this.state.amtMoney,
                success:(result)=>{
                    alert('投资成功了')
                    this.setState({
                        loaded:true
                    })
                },
                fail:(result)=>{
                    this.setState({
                        loaded:true
                    })
                    setTimeout(()=>{
                        alert(result.message)
                    },300)

                }
            })
        }
    }
    checkInput(){
        const amtMoney = this.state.amtMoney;
        if(amtMoney < 100){
            alert('100元起投')
            return false;
        }
        return true;
    }
}
InvestPage1.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        product:state.product.type1
    }
}

export default connect(mapStateToProps, {
    fetchLCList,
    payForProduct
})(InvestPage1)
