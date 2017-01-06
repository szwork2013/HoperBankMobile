import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTempRecord,clearTempRecord } from 'actions'
import RootLoading from 'components/RootLoading'
import ListView from 'components/ListView'
import config from 'componentConfig'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { browserHistory,Link } from 'react-router'
class TempRecordList extends Component {
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
        props.clearTempRecord();
        props.fetchTempRecord({
            curPage:1,
            type:props.params.type,
            callback:()=>{
                this.setState({
                    loaded:true
                })
            }
        })
    }
    fetchFunc(opt){
            this.props.fetchTempRecord({
                curPage:opt.curPage,
                type:this.props.params.type,
                callback:opt.callback
            })
    }
    render(){
        const props = this.props;
        const iScrollHeight = config.windowHeight
        return(
            <div className="level-2-wrap" >
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <ListView
                    dataSource={props.dealRecord}
                    renderRow={this.renderItem.bind(this)}
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
            <Link to={`${this.props.location.pathname}/${item.id}`} className="news-item" key={index} >
                <div className="part-left">
                    <h3>{item.title}</h3>
                    <p>{item.date}</p>
                </div>
                <div className="part-right">
                    <img src={(item.typeId && item.typeId!=8) ? `/static/img/discover/media/${item.typeId}.jpg` : `/static/img/discover/default.jpg`} />
                </div>
            </Link>
            )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        dealRecord:state.tempRecord.list,
        isFetching:state.isFetching
    }
}
TempRecordList.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps, {
    fetchTempRecord,
    clearTempRecord
})(TempRecordList)
