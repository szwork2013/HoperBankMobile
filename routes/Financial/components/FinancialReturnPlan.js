import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import { connect } from 'react-redux'
import RootLoading from 'components/RootLoading'
import config from 'componentConfig'
import {fetchFinancialReturnPlan,clearFinancialReturnPlan} from 'actions'
class FinancialReturnPlan extends Component {
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

        props.clearFinancialReturnPlan()
        props.fetchFinancialReturnPlan({
            type:props.params.productType,
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
        props.fetchFinancialReturnPlan({
            type:props.params.productType,
            curPage:opt.curPage,
            projectId:props.params.id,
            callback:opt.callback
        })
    }
    renderItem(item,index){
        return(
            <div key={index} className="com-list-item col-3">
                <p>
                    <span>{item.limit}</span>
                    <span>{item.shouldPay}</span>
                    <span>{item.balance}</span>
                </p>
            </div>
        )
    }
    render(){
        const props = this.props;
        var canUseHeight = config.windowHeight - config.tabBarHeight
        return(
            <div className="level-2-wrap" >
                <div className="com-list-tit col-3">
                    <p>
                        <span >期数</span>
                        <span >应还金额</span>
                        <span >剩余金额</span>
                    </p>
                </div>
                <ListView
                    dataSource={props.returnPlanList}
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
        returnPlanList:state.product.returnPlan
    }
}

export default connect(mapStateToProps, {
    fetchFinancialReturnPlan,
    clearFinancialReturnPlan
})(FinancialReturnPlan)
