import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var RootLoading = React.createClass({
  componentWillMount(){

  },
    renderLoading(){
        return(
            <div className={'root-loading'}>
                <div className="root-loading-bg"></div>
                <div style={{left:(document.body.clientWidth-100)/2,top:($(window).height() -100)/2}} className="root-loading-con"></div>
            </div>
        )
    },
  render() {
    return (
        <ReactCSSTransitionGroup component="div"
                                 transitionName="root-loading"
                                 transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {this.props.display && this.renderLoading()}
        </ReactCSSTransitionGroup>



    )
  }
})
export default RootLoading
