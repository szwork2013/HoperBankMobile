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
            this.props.fetchDealRecord({
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

        return(
            <div className={`my-deal-record-item animated fadeInLeft`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                <div className="my-deal-record-info">
                    <p>
                        {item.remarkTime}
                    </p>
                    <p>
                        <span className="my-deal-record-money">{item.money}元</span>
                        <span className="my-deal-record-status">
                            {statusTxt}
                        </span>
                    </p>
                    <p>
                        <span className="my-deal-record-order-id">{item.productName}[流水号：{item.orderId}]</span>
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
