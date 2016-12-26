import React, { Component, PropTypes } from 'react'
export default class IconButton extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.func,
        icon:PropTypes.string,
        hasArrow:PropTypes.bool,
        hasArrowText:PropTypes.bool,
        arrowText:PropTypes.string,
        href:PropTypes.string,
        hasBorder:PropTypes.bool
    }
    static defaultProps = {
        onClick: ()=>{},
        text: 'button',
        icon:'',
        hasArrow:true,
        arrowText:'',
        href:'javascript:',
        hasBorder:true
    }
    render() {
        const props = this.props;
        return (
            <div className="icon-button-wrap" onClick={props.onClick}>
                <a className={props.hasBorder ? 'icon-button-con' : 'icon-button-con icon-button-no-border'} href={props.href}>
                    <i className={'icon '+props.icon}></i>
                    <span className="icon-button-text">{props.text}</span>
                    <div className="icon-arrow-wrap">
                        {props.arrowText!='' && <span className="arrow-text">{props.arrowText}</span>}
                        {props.hasArrow && <i className="icon icon-arrow-right"></i>}
                    </div>
                </a>
            </div>
        )
    }
}
