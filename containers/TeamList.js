import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTeamList,clearTeamList } from '../actions'
import RootLoading from '../components/RootLoading'
import ListView from '../components/ListView'

class TeamList extends Component {
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

        props.clearTeamList();
        props.fetchTeamList({
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
            this.props.fetchTeamList({
                curPage:opt.curPage,
                userId:this.props.id,
                type:this.props.type,
                callback:opt.callback
            })
    }
    render(){
        const props = this.props;
        var canUseHeight = $(window).height() - 52 -44-50
        return(
            <div className="" >
                <div className="my-team-tit">
                    <p>
                        <span >注册时间</span>
                        <span >队友实名</span>
                        <span >手机号码</span>
                        <span >状态</span>
                    </p>
                </div>
                <ListView
                    dataSource={props.teamList}
                    renderRow={this.renderItem}
                    fetchFunc={this.fetchFunc}
                    wrapperClass=''
                    params={this.state.params}
                    isFetching={props.isFetching}
                    style={{height:canUseHeight}}
                >
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    renderItem(item,index){
        return(
                <div key={index} className="my-team-list-item">
                    <p>
                        <span>{item.regTime}</span>
                        <span>{item.realName || '未实名'}</span>
                        <span>{item.tel}</span>
                        <span>{item.status == 0? '未交易':'已交易'}</span>
                    </p>
                </div>
            )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        teamList:state.team.teamList,
        isFetching:state.isFetching
    }
}

export default connect(mapStateToProps, {
    fetchTeamList,
    clearTeamList
})(TeamList)
