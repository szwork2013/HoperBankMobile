import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchReturnPlanRecord,clearReturnPlanRecord } from 'actions'
import RootLoading from 'components/RootLoading'
import ListView from 'components/ListView'
import config from 'componentConfig'
class ReturnPlanRecordList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
        this.fetchFunc = this.fetchFunc.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }
    componentWillMount() {
        //先清除产品2数据
        const props = this.props;

        props.clearReturnPlanRecord();
        props.fetchReturnPlanRecord({
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
            this.props.fetchReturnPlanRecord({
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
                    dataSource={props.returnPlanRecord}
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
        return(
            <div className={`return-plan-record-item  animated fadeInLeft`} key={index} style={{animationDuration:0.5+(index%10 / 5)+'s'}}>
                    <div className="return-plan-record-info">
                        <h2 className="return-plan-h2">{item.productName}</h2>
                        <p className="return-plan-p">
                            <span>应收金额</span>
                            <span>回款期数</span>
                            <span>{this.props.type==2? '实际回款时间' : '预计回款时间'}</span>
                        </p>
                        <p className="return-plan-p">
                            <span>{(parseFloat(item.planInterest) + parseFloat(item.planPrincipal)).toFixed(2) + '元'}</span>
                            <span>{item.planCycle+'期'}</span>
                            <span>{item.planDate}</span>
                        </p>
                    </div>
            </div>
            )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        returnPlanRecord:state.user.returnPlanRecord,
        isFetching:state.isFetching
    }
}

export default connect(mapStateToProps, {
    fetchReturnPlanRecord,
    clearReturnPlanRecord
})(ReturnPlanRecordList)
