import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class RootLoading extends Component{
    static propTypes = {
        type:PropTypes.number
    }
    static defaultProps = {
        display:false,
        type:1
    }


    renderLoading(){
       /* return(
            <div className={'root-loading'}>
                <div className="root-loading-bg"></div>
                <div style={{left:(document.body.clientWidth-100)/2,top:(document.body.clientHeight -100)/2}} className="root-loading-con"></div>
            </div>
        )*/
        return (
            <div className={'root-loading'}>
                <div className="root-loading-bg"></div>
                <div style={{left:(document.body.clientWidth-100)/2,top:(document.body.clientHeight -100)/2}} className="root-loading-con">
                    <div className="root-loading-con-bg"></div>
                    <div  className="loader-inner line-spin-fade-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <ReactCSSTransitionGroup component="div"
                                     transitionName="root-loading"
                                     transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {this.props.display && this.renderLoading()}
            </ReactCSSTransitionGroup>
        )
    }
}
