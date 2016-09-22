import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {fetchActivityList} from 'actions'
import RootLoading from 'components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class ActivityCenter extends Component {
    constructor(props) {
        super(props)
        this.state={
            detailUrl:'',
            loaded:false
        }
    }
    componentWillMount() {
        const props = this.props;
        props.fetchActivityList((result)=>{
            if(result.r==1){
                this.setState({
                    loaded:true
                })
            }
        })
    }
    componentDidMount(){

    }
    render() {
        const props = this.props;
        return (
            <section className="level-2-wrap">
                <RootLoading display={!this.state.loaded}/>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        props.children && React.cloneElement(props.children, {
                            url:this.state.detailUrl
                        })
                    }
                </ReactCSSTransitionGroup>
                {
                    props.activity.map((item,index)=>{
                        return(
                            <section className="activity-wrap" key={index}>
                                <div className="activity-item"  onClick={()=>{
                                    this.state.detailUrl=item.link
                                    this.setState({
                                        detailUrl:item.link
                                    })
                                    //this.context.router.push('/activity/detail/')
                                    location.href=item.link
                                }}>
                                    <h3><i></i>{item.title}</h3>
                                    <p>{item.startTime}---{item.endTime}</p>
                                    <div className={item.status==0?'gray':''}>
                                        <img src={item.image} />
                                    </div>
                                    <p>{item.describe}</p>
                                </div>
                            </section>
                        )
                    })
                }
            </section>
        )
    }
}
ActivityCenter.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        activity:state.activity
    }
}

module.exports =  connect(mapStateToProps, {
    fetchActivityList
})(ActivityCenter)
