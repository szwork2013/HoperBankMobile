import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import IconButton from 'IconButton'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class DiscoverPage extends Component {
    constructor(props) {
        super(props)
        this.jumpTo = this.jumpTo.bind(this);
    }
    jumpTo(link){
        this.context.router.push(link)
    }
    render() {
        return (
            <section className="discover-wrap">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <div className={`borrow-banner animated fadeIn`}>
                    <img src="/static/img/discover_banner.jpg" width="100%" />
                </div>
                <section className="my-btn-wrap" style={{marginTop:'0'}}>
                    <IconButton text="媒体报道" icon="icon-media" onClick={()=>{this.jumpTo('/discover/media/1')}} />
                    <IconButton text="理财知识" icon="icon-knowledge" onClick={()=>{this.jumpTo('/discover/knowledge/2')}} />
                    <IconButton text="走进我们" hasBorder={false} icon="icon-about-us" onClick={()=>{this.jumpTo('/discover/about')}} />
                </section>
                <section className="my-btn-wrap">
                    <IconButton text="借款服务" icon="icon-borrow" hasBorder={false} onClick={()=>{this.jumpTo('/discover/borrow/list')}} />
                </section>
            </section>
        )
    }
}
DiscoverPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
/*
module.exports = DiscoverPage*/
