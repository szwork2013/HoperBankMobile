import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchDealRecord,clearDealRecord } from 'actions'
import RootLoading from 'components/RootLoading'
import ListView from 'components/ListView'
import config from 'componentConfig'


class DealRecordList extends Component {
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
        props.clearDealRecord();
        props.fetchDealRecord({
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
            this.props.fetchDealRecord({
                curPage:opt.curPage,
                type:this.props.type,
                callback:opt.callback
            })
    }
    render(){
        const props = this.props;
        const iScrollHeight = config.windowHeight - config.tabBarHeight
        return(
            <div className="" >
                <ListView
                    dataSource={props.dealRecord}
                    renderRow={this.renderItem}
                    fetchFunc={this.fetchFunc}
                    wrapperClass=''
                    params={this.state.params}
                    isFetching={props.isFetching}
                    style={{height:iScrollHeight}}
                >
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    renderItem(item,index){
        var statusTxt='';
        var typeTxt = '';
        if(item.productName){
            switch (parseInt(item.status)){
                case 0:
                    statusTxt = '失败';
                    break;
                case 5:
                    statusTxt ='撤销';
                    break;
                default:
                    statusTxt = '成功';
                    break;
            }
        }else{
            switch (parseInt(item.status)){
                case 1:
                    statusTxt = '成功';
                    break;
                default:
                    statusTxt = '失败';
                    break;
            }
        }
        switch (parseInt(item.type)){
             case 1:
                 typeTxt='充值';
                break;
            case 2:
                typeTxt='提现';
                break;
            case 3:
                typeTxt='投资';
                break;
            case 4:
                typeTxt='投资撤销';
                break;
            case 5:
                typeTxt='收益';
                break;
            case 6:
                typeTxt='红包';
                break;
            case 7:
                typeTxt='佣金';
                break;
            //no default
        }

        return(
            <div className={`my-deal-record-item animated fadeInLeft`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                <div className="my-deal-record-info">
                    <p>
                        <span className="my-deal-record-type">{typeTxt}</span>
                        <span className={`my-deal-record-status ${statusTxt == '成功'? '' : 'fail'}`}>
                            {statusTxt}
                        </span>
                        <span className="my-deal-record-money">{parseFloat(item.money).toFixed(2)}</span>
                    </p>
                    <p>
                        <span className="my-deal-record-order-id">流水号:{item.orderId}</span>
                        <span className="my-deal-record-order-date">{item.remarkTime}</span>
                    </p>
                </div>
            </div>
            )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        dealRecord:state.user.dealRecord,
        isFetching:state.isFetching
    }
}

export default connect(mapStateToProps, {
    fetchDealRecord,
    clearDealRecord
})(DealRecordList)
