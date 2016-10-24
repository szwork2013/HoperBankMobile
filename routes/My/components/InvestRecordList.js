import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchInvestRecord,clearInvestRecord,cancelInvest,reBuyOperation,setInvestRecordShouldUpdate} from 'actions'

import RootLoading from 'components/RootLoading'
import ListView from 'components/ListView'
import config from 'componentConfig'
class InvestRecordList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        };
        this.fetchFunc = this.fetchFunc.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.cancelInvest =this.cancelInvest.bind(this);
        this.initData = this.initData.bind(this);
        this.viewCreditorList = this.viewCreditorList.bind(this)
    }
    componentWillMount() {
        this.initData();
    }
    initData(){
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
        //如果下一次传进来的为true，就重新更新一下数据,然后再把这个是否要更新值重置为false
        if(nextProps.investRecordShouldUpdate){
            this.initData();
            this.props.setInvestRecordShouldUpdate(false);
        }
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
        const iScrollHeight = config.windowHeight - config.tabBarHeight
        return(
            <div className="relative" >
                <ListView
                    dataSource={props.investRecord}
                    renderRow={this.renderItem}
                    fetchFunc={this.fetchFunc}
                    wrapperClass='invest-record-wrap'
                    params={this.state.params}
                    isFetching={props.isFetching}
                    style={{height:iScrollHeight}}
                >
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    cancelInvest(productId,investId){
        const props = this.props;
        const r = confirm('要撤销该投资吗');
        if(r){
            this.setState({
                loaded:false
            })
            props.cancelInvest({
                productId:productId,
                investId:investId,
                callback:(result)=>{
                    if(result.r==1){
                        this.initData();
                        this.setState({
                            loaded:true
                        })
                        setTimeout(()=>{
                            alert('取消投资成功!');
                        },300)

                    }else{
                        alert(result.msg)
                    }
                }
            })
        }
    }
    reBuyOperation(productId,investId,operation){
        const props = this.props;
        //console.log(productId,investId)
        if(operation==1){
            this.context.router.push({
                pathname:'/my/investmentrecord/select',
                query:{
                    investId:investId,
                    operation:operation
                }
            })
            return false;
        }
        const r = confirm('是否撤销该续投?');
        if(r){
            props.reBuyOperation({
                userId:props.account.userId,
                productId:productId,
                investId:investId,
                operation:operation,
                callback:(result)=>{
                    if(result.r==1){
                        this.initData();
                        alert('撤销成功!');
                    }else{
                        alert(result.msg)
                    }
                }
            })
        }
    }
    viewCreditorList(id){
        this.props.setInvestId(id);
        this.context.router.push({
            pathname:`/my/investmentrecord/creditorList${id}`
        })
    }
    renderItem(item,index){
        //item.reBuyStatus = 1;
        const shortTitleStyle={
            width:'50%'
        }

        return(
            <div className={`invest-record-item animated fadeInLeft`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                <div className={`invest-type-icon-${item.productType}`}></div>
                    <div className="invest-record-info" >
                        <p className="p1">
                            <span className="fl invest-record-title" style={item.productType==0 ? shortTitleStyle : null}>{item.productName}
                                {
                                    item.productType==0 && item.status==3 && item.reBuyStatus==2 && <span className="invest-record-title-tip">续投</span>
                                }
                            </span>
                            {
                                item.productType==0 && item.status==1 && <span className="fr operation" onClick={()=>{this.cancelInvest(item.pid,item.investId)}}>取消投资</span>
                            }
                            {
                                item.productType==0 && (item.status==2 || item.status==3 || item.status==4) && <span style={{marginLeft:'10px'}} className="fr operation" onClick={()=>{this.viewCreditorList(item.investId)}}>查看债权</span>
                            }
                            {
                                item.productType==0 && item.status==3 && item.reBuyStatus==1 && <span className="fr operation" onClick={()=>{this.reBuyOperation(item.pid,item.investId,1)}}>续投</span>
                            }
                            {
                                item.productType==0 && item.status==3 && item.reBuyStatus==2 && <span className="fr operation" onClick={()=>{this.reBuyOperation(item.pid,item.investId,2)}}>取消续投</span>
                            }
                        </p>
                        <div className="item-record-detail">
                            <div className="part-1">
                                <p>预计年化收益</p>
                                <p>{item.productRate+'%'}{item.addRate? <span className="invest-record-money"> + {item.addRate}%</span> : ''}</p>
                            </div>
                            <div className="part-2">
                                <p>投资金额</p>
                                <p>{item.actualMoney +'元'}</p>
                            </div>
                            <div className="part-3">
                                <p>预期收益</p>
                                <p className="invest-record-money">
                                    {
                                        /* 计算利息时分开原利息与加息卡计算，最后再相加 */
                                        item.addRate ?
                                        parseFloat(calSY(
                                            {
                                                money:item.actualMoney,
                                                rate:item.productRate,
                                                productCycle:item.productCycle,
                                                type:item.productType
                                            }
                                        )) + parseFloat(calSY(
                                            {
                                                money:item.actualMoney,
                                                rate:item.addRate || 0,
                                                productCycle:item.productCycle,
                                                type:item.productType
                                            }
                                        )) : parseFloat(calSY(
                                            {
                                                money:item.actualMoney,
                                                rate:item.productRate,
                                                productCycle:item.productCycle,
                                                type:item.productType
                                            }
                                        ))

                                    }
                                </p>
                            </div>
                        </div>
                        <p className="p2">
                            <span className="fl">{`投资时间:${item.payTime}`}</span>
                            {
                                (item.status == 3 || item.status == 4) && <span className="fr text-right">{item.status==3?'预计':'实际'}结算时间:{item.clearTime}</span>
                            }
                        </p>
                    </div>
            </div>
            )
    }
}
function calSY(opt){
    switch (opt.type){
        // 0 和1的时候都是等额本息，so 0直接穿透去1
        case 0:
            return parseFloat( opt.money * opt.rate / 100 / 12 * opt.productCycle).toFixed(2);
            break;
        case 1:
        case 2:
            return parseFloat(opt.money * (opt.rate / 100 / 12) * Math.pow(1 + (opt.rate / 100 / 12), opt.productCycle) / (Math.pow(1 + (opt.rate / 100 / 12), opt.productCycle) - 1) * opt.productCycle - opt.money).toFixed(2)
            break;
        // no default
    }

}

InvestRecordList.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        investRecord:state.user.investRecord,
        investRecordShouldUpdate:state.user.investRecordShouldUpdate,
        isFetching:state.isFetching,
        account:state.account
    }
}

export default connect(mapStateToProps, {
    fetchInvestRecord,
    clearInvestRecord,
    cancelInvest,
    reBuyOperation,
    setInvestRecordShouldUpdate
})(InvestRecordList)
