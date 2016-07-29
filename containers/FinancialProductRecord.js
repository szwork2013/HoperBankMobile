import React, { Component, PropTypes } from 'react'
import ListView from '../components/ListView'
import { connect } from 'react-redux'
import RootLoading from '../components/RootLoading'
import DealRecordList from './DealRecordList'
import config from './componentConfig'
import {fetchFinancialInvestRecord,clearFinancialInvestRecord} from '../actions'
class FinancialProductRecord extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
        this.fetchFunc =this.fetchFunc.bind(this);
    }
    componentWillMount() {
        //先清除数据
        const props = this.props;
        props.clearFinancialInvestRecord()
        props.fetchFinancialInvestRecord({
            curPage:1,
            projectId:props.params.id,
            callback:()=>{
                this.setState({
                    loaded:true
                })
            }
        })
    }
    fetchFunc(opt){
        const props = this.props;
        props.fetchFinancialInvestRecord({
            curPage:opt.curPage,
            projectId:props.params.id,
            callback:opt.callback
        })
    }
    renderItem(item,index){
        return(
            <div key={index} className="my-team-list-item">
                <p>
                    <span>{item.user}</span>
                    <span>{item.money}</span>
                    <span>{item.time}</span>
                    <span>成功</span>
                </p>
            </div>
        )
    }
    render(){
        const props = this.props;
        var canUseHeight = config.windowHeight - config.tabBarHeight
        return(
            <div className="level-2-wrap" >
                <div className="my-team-tit">
                    <p>
                        <span >投资用户</span>
                        <span >投资金额</span>
                        <span >投资时间</span>
                        <span >状态</span>
                    </p>
                </div>
                <ListView
                    dataSource={props.investList}
                    renderRow={this.renderItem}
                    fetchFunc={this.fetchFunc}
                    wrapperClass=''
                    isFetching={props.isFetching}
                    style={{height:canUseHeight}}
                >
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        investList:state.product.investRecord
    }
}

export default connect(mapStateToProps, {
    fetchFinancialInvestRecord,
    clearFinancialInvestRecord
})(FinancialProductRecord)
