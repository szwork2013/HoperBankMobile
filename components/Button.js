import React, { Component, PropTypes } from 'react'
export class BaseButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
        <div className={"base-button " + props.className} onClick={props.onClick}>
          {props.text}
        </div>
    )
  }
}
BaseButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className:PropTypes.string,
}
BaseButton.defaultProps = {
  onClick: ()=>{},
  text: 'button',
  className:''
}

