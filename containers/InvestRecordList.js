import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchInvestRecord,clearInvestRecord } from '../actions'
import RootLoading from '../components/RootLoading'
import ListView from '../components/ListView'

class InvestRecordList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
        this.fetchFunc = this.fetchFunc.bind(this);
    }
    componentWillMount() {
        //先清除产品2数据
        const props = this.props;

        props.clearInvestRecord();
        props.fetchInvestRecord({
            userId:props.id,
            curPage:1,
            type:props.type,
            callback:()=>{
                this.setState({
                    loaded:true
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {

    }
    fetchFunc(opt){
            this.props.fetchInvestRecord({
                curPage:opt.curPage,
                userId:this.props.id,
                type:this.props.type,
                callback:opt.callback
            })
    }
    render(){
        const props = this.props;
        return(
            <div className="" >
                <ListView
                    dataSource={props.investRecord}
                    renderRow={this.renderItem}
                    fetchFunc={this.fetchFunc}
                    wrapperClass=''
                    params={this.state.params}
                    isFetching={props.isFetching}
                    style={{height:$(window).height() - $('.main-foot-nav').height() - $('.tab-title-items').height()}}
                >
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    renderItem(item,index){
        var productType='';
        switch (item.productType){
            case 0:
                productType = '理财服务';
                break;
            case 1:
                productType ='优选服务';
                break;
            case 2:
                productType ='债权转让';
                break;
            //no default
        }
        return(
            <div className="invest-record-item" key={index}>
                    <div className="invest-record-info" onClick={(e)=>{
                                        $(e.target).closest('.invest-record-item').toggleClass('active')
                                    }}>
                        <p>
                            <span className="fl invest-record-title">{item.productName}</span>
                            <span className="fr">{item.payTime}</span>
                        </p>
                        <p>
                            <span className="fl invest-record-money">{item.actualMoney}元</span>
                            <span className="fr">
                                {productType}
                            </span>
                        </p>
                        <p>
                            <i className="icon icon-arrow-down-1 fr"></i>
                            <span className="fl record-btn-text">查看详情</span>
                        </p>
                        <div className="item-record-detail">
                            <p>
                                <span className="fl"><em className="em1">项目期限</em><em className="em2">{item.productCycle}期</em></span>
                            </p>
                            <p>
                                <span className="fl"><em className="em1">年化收益</em><em className="em2">{item.productRate}%</em></span>
                            </p>
                            <p>
                                 <span className="fl"><em className="em1">预估收益</em><em className="em2">{
                                     calSY({
                                         type:item.productType,
                                         money:item.matchMoney,
                                         rate:item.productRate,
                                         productCycle:item.productCycle
                                     })
                                 }元</em></span>
                             </p>
                            <p>
                                <span className="fl"><em className="em1">流水号</em><em className="em2">{item.orderId}</em></span>
                            </p>
                        </div>
                    </div>
            </div>
            )
    }
}
function calSY(opt){
    switch (opt.type){
        // 0 和1的时候都是等额本息，so 0直接穿透去1
        case 0:
        case 1:
            return parseFloat(opt.money * (opt.rate / 100 / 12) * Math.pow(1 + (opt.rate / 100 / 12), opt.productCycle) / (Math.pow(1 + (opt.rate / 100 / 12), opt.productCycle) - 1) * opt.productCycle - opt.money).toFixed(2)
            break;
        case 2:
            return parseFloat( opt.money * opt.rate / 100 / 12 * opt.productCycle).toFixed(2);
            break;
        // no default
    }

}

function mapStateToProps(state, ownProps) {
    return {
        investRecord:state.user.investRecord,
        isFetching:state.isFetching
    }
}

export default connect(mapStateToProps, {
    fetchInvestRecord,
    clearInvestRecord
})(InvestRecordList)
