import React, { Component, PropTypes } from 'react'
export default class IconButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
        <div className="icon-button-wrap" onClick={props.onClick}>
          <a className={props.hasBorder ? 'icon-button-con' : 'icon-button-con icon-button-no-border'} href={props.href}>
            <i className={'icon '+props.icon}></i>
            <span className="icon-button-text">{props.text}</span>
            <div className="icon-arrow-wrap">
              {props.hasArrow && <i className="icon icon-arrow-right"></i>}
              {props.arrowText!='' && <span className="arrow-text">{props.arrowText}</span>}
            </div>
          </a>
        </div>
    )
  }
}
IconButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  icon:PropTypes.string,
  hasArrow:PropTypes.bool,
  hasArrowText:PropTypes.bool,
  arrowText:PropTypes.string,
  href:PropTypes.string,
  hasBorder:PropTypes.bool
}
IconButton.defaultProps = {
  onClick: ()=>{},
  text: 'button',
  icon:'',
  hasArrow:true,
  arrowText:'',
  href:'javascript:',
  hasBorder:true
}
