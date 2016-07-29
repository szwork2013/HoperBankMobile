import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import { connect } from 'react-redux'
import {fetchLCList,payForProduct} from '../actions'
import RootLoading from '../components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {BaseButton,TextButton} from '../components/Button'
import Overlay from '../components/Overlay'
class InvestPage2 extends Component{
    constructor(props) {
        super(props)
        this.state={
            amtMoney:10000,
            loaded:false,
            overlayShouldShow:false,
            canSubmit:true
        }
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
                <section className="m-item-wrap mt0">
                    <div className="project-invest-wrap">
                        <div className="project-invest-info">
                            <div className="part-left">
                                <p className="p1">年化利率</p>
                                <p className="p2"><span id="rate"><icon class="loading"></icon></span><span class="f14">%</span></p>
                            </div>
                            <div className="part-right">
                                <p className="p1"><span>期限<i style="font-style: normal;" id="productCycle">9</i>个月</span></p>
                            </div>
                        </div>
                        <div className="project-invest-progress">
                            <div className="project-invest-progress-max">
                                <div className="project-invest-progress-current" >
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="project-money-info">
                            <div className="d1">
                                项目总额元
                            </div>
                            <div className="d2">
                                剩余可投 元
                            </div>
                        </div>
                        <div className="project-money-info-2">
                            <p>投资区间:<span className="s1"></span><span className="s2">元起投</span></p>
                            <p>还款方式:<span className="s2" >等额本息</span></p>
                        </div>
                    </div>
                </section>
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
InvestPage2.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        product:state.product.type2
    }
}

export default connect(mapStateToProps, {
    fetchLCList,
    payForProduct
})(InvestPage2)
