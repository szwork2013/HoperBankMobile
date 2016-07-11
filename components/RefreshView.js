import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class RefreshView extends Component {
  constructor(props) {
    super(props)
  }
  renderLoading(){
    return(
        <div className={'refresh-loading'}>
          <div className="refresh-loading-bg"></div>
          <div className="refresh-loading-con">
            上拉加载更多
          </div>
        </div>
    )
  }
  render() {
    const props = this.props;
    return (
        <div className={"refresh-loading-wrap " + (props.display? 'show':'hide')} >
          <div className={'refresh-loading'}>
            <div className="refresh-loading-bg"></div>
            <div className="refresh-loading-con">
              {props.text}
            </div>
          </div>
        </div>
    )
  }
}
RefreshView.propTypes = {
  display:PropTypes.bool
}
RefreshView.defaultProps = {
  display:false
}

