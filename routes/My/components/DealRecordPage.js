import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import DealRecordList from './DealRecordList'
import Selector from 'components/Selector'
const data = [
    {
        param:"type",
        group:[
            {
                text:'全部类型',
                value:0
            },
            {
                text:'充值',
                value:1
            },
            {
                text:'提现',
                value:2
            },
            {
                text:'投资',
                value:3
            },
            {
                text:'投资撤销',
                value:4
            },
            {
                text:'收益',
                value:5
            },
            {
                text:'红包',
                value:6
            },
            {
                text:'佣金',
                value:7
            }
        ]
    },
    {
        param:"time",
        group:[
            {
                text:'全部时间',
                value:0
            },
            {
                text:'七天以内',
                value:1
            },
            {
                text:'一个月以内',
                value:2
            },
            {
                text:'六个月以内',
                value:3
            },
            {
                text:'一年以内',
                value:4
            }
        ]
    }
]
class DealRecordPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            type:{
                text:'',
                value:0,
            },
            time:{
                text:'',
                value:0
            }
        }
    }
    render() {

        return (
            <section className="level-2-wrap">
                <Selector
                    data={data}
                    selectCallback={(obj)=>{
                        this.setState(obj)
                    }}
                />
                <DealRecordList  type={this.state.type.value} time={this.state.time.value} />
            </section>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        account:state.account
    }
}

export default connect(mapStateToProps, {

})(DealRecordPage)
