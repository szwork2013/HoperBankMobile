import React, { Component, PropTypes } from 'react'
export class BaseButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        return (
            <button disabled={props.disabled || false} className={"base-button " + props.className} onClick={props.onClick} style={props.style || null}>
                {props.text}
            </button>
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

export class TextButton extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        const props = this.props;
        return(
            <div className={"base-text-button-wrap " + props.className } style={props.style || {}} onClick={props.onClick}>
                <div className={"base-text-button-info " + (!props.hasBorder && 'no-border')}>
                    <span>{props.text}</span>
                    {props.hasIcon && <i className="icon icon-arrow-right"></i>}
                </div>

            </div>
        )
    }
}
TextButton.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    className:PropTypes.string,
    hasBorder:PropTypes.bool,
    hasIcon:PropTypes.bool
}
TextButton.defaultProps = {
    onClick: ()=>{},
    text: 'button',
    hasBorder:true,
    className:'',
    hasIcon:true
}