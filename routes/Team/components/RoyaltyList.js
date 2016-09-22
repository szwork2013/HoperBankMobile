import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchRoyaltyList } from 'actions'
import RootLoading from 'components/RootLoading'
import ListView from 'components/ListView'
const yearArr = [2016,2017,2018];
class RoyaltyList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false,
            year:yearArr[0]
        }
    }
    componentWillMount() {
        this.updateList(this.state.year)
    }
    updateList(year){
        const props = this.props;
        this.setState({
            loaded:false
        })
        props.fetchRoyaltyList(this.props.account.userId,year,(data)=>{
            this.setState({
                loaded:true
            })
        })
    }
    render(){
        const props = this.props;
        return(
            <div className="level-2-wrap">
                <div className="select-wrap">
                    <span className="select-value">
                        <span>
                            <span>{this.state.year}</span><i></i>
                        </span>
                    </span>
                    <select onChange={(e)=>{
                        this.updateList(e.target.value)
                    }}>
                        {yearArr.map((item,index)=>{
                            return(
                                <option value={item} key={index}>{item}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    {
                        props.royaltyList.length == 0? <p className="no-record">暂无记录</p> : props.royaltyList.map((item,index)=>{
                            return(
                                <div className="royalty-item" key={index}>
                                    <p onClick={(e)=>{
                                        $(e.target).closest('.royalty-item').toggleClass('active')
                                    }}>
                                        <span className="month">{item.month}</span>
                                        <span className="s3">业务额(元)</span>
                                        <span className="s3">提成(元)</span>
                                        <i className="icon icon-arrow-down-1"></i>
                                    </p>
                                    <div className="item-record-detail">
                                        <p>
                                            <span className="s1">直接</span>
                                            <span className="s3">{item.directTurnover}</span>
                                            <span className="s3">{item.directroyalty}</span>
                                        </p>
                                        <p>
                                            <span className="s1">间接</span>
                                            <span className="s3">{item.indirectTurnover}</span>
                                            <span className="s3">{item.indirectroyalty}</span>
                                        </p>
                                        <p>
                                            <span className="s1">总额</span>
                                            <span className="s3">{item.directSum}</span>
                                            <span className="s3">{item.indirectSum}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        royaltyList:state.team.royaltyList,
        account:state.account
    }
}

export default connect(mapStateToProps, {
    fetchRoyaltyList
})(RoyaltyList)
