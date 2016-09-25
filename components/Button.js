import React, { Component, PropTypes } from 'react'
export class BaseButton extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func,
        className:PropTypes.string,
    }
    static defaultProps = {
        onClick: ()=>{},
        text: 'button',
        className:''
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


export class TextButton extends Component{
    constructor(props) {
        super(props)
    }
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func,
        className:PropTypes.string,
        hasBorder:PropTypes.bool,
        hasIcon:PropTypes.bool
    }
    static defaultProps = {
        onClick: ()=>{},
        text: 'button',
        hasBorder:true,
        className:'',
        hasIcon:true
    }
    renderRightText(){
        if(this.props.rightText){
            return(
                <span className="fr">{this.props.rightText}</span>
            )
        }
    }
    render(){
        const props = this.props;
        return(
            <div className={"base-text-button-wrap " + props.className } style={props.style || {}} onClick={props.onClick}>
                <div className={"base-text-button-info " + (!props.hasBorder && 'no-border')}>
                    <span>{props.text}</span>
                    {props.hasIcon && <i className="icon icon-arrow-right"></i>}
                    {this.renderRightText.bind(this)()}
                </div>

            </div>
        )
    }
}
