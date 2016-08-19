import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {fetchActivityList} from '../actions'
import RootLoading from '../components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class ActivityCenter extends Component {
    constructor(props) {
        super(props)
        this.state={
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
                        props.children
                    }
                </ReactCSSTransitionGroup>
                {
                    props.activity.map((item,index)=>{
                        return(
                            <section className="activity-wrap" key={index}>
                                <a className="activity-item" href={item.link}>
                                    <h3><i></i>{item.title}</h3>
                                    <p>{item.startTime}---{item.endTime}</p>
                                    <div className={item.status==0?'gray':''}>
                                        <img src={item.image} />
                                    </div>
                                    <p>{item.describe}</p>
                                </a>
                            </section>
                        )
                    })
                }
            </section>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        activity:state.activity
    }
}

export default connect(mapStateToProps, {
    fetchActivityList
})(ActivityCenter)
