import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Overlay = React.createClass({
  componentWillMount(){

  },
    renderOverlay(){
        return(
            <div className={'overlay'} onClick={this.props.onClick}>
                <div className="overlay-bg"></div>
                {
                    this.props.children
                }
            </div>
        )
    },
  render() {
    return (
        <ReactCSSTransitionGroup component="div"
                                 transitionName="overlay-css"
                                 transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {this.props.display && this.renderOverlay()}
        </ReactCSSTransitionGroup>



    )
  }
})
Overlay.propTypes = {
    display: PropTypes.bool,
    onClick: PropTypes.func,
    className:PropTypes.string,
}
Overlay.defaultProps = {
    display: true,
    onClick:()=>{},
    className:'',
}
export default Overlay
