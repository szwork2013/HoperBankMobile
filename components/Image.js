import React, { Component, PropTypes } from 'react'
export default class Image extends Component{
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
    render() {
        return <img />
    }
}