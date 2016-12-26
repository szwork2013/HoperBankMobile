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
    static propTypes = {
        activity:PropTypes.array.isRequired,
        fetchActivityList:PropTypes.func.isRequired
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
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
    render() {
        const props = this.props;
        return (
            <section className="level-2-wrap">
                <RootLoading display={!this.state.loaded}/>
                {
                    props.activity.map((item,index)=>{
                        return(
                            <section className="activity-wrap" key={index}>
                                <div className="activity-item"  onClick={()=>{
                                    this.state.detailUrl=item.link
                                    this.setState({
                                        detailUrl:item.link
                                    })
                                    location.href=item.link
                                }}>
                                    <div className={item.status==0?'gray':''}>
                                        <img src={item.image} />
                                    </div>
                                    <h3>{item.title}<span>{item.startTime}~{item.endTime}</span></h3>
                                </div>
                            </section>
                        )
                    })
                }
            </section>
        )
    }
}

module.exports = ActivityCenter