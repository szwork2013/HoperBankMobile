import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class Overlay extends Component{
    static propTypes = {
        display: PropTypes.bool,
        onClick: PropTypes.func,
        className:PropTypes.string,
    }
    static defaultProps = {
        display: true,
        onClick:()=>{},
        className:'',
    }
    renderOverlay(){
        return(
            <div className={'overlay'} onClick={this.props.onClick}>
                <div className="overlay-bg"></div>
                {
                    this.props.children
                }
            </div>
        )
    }
    render() {
        return (
            <ReactCSSTransitionGroup component="div"
                                     transitionName="overlay-css"
                                     transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {this.props.display && this.renderOverlay()}
            </ReactCSSTransitionGroup>
        )
    }
}