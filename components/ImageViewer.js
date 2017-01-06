import React, { Component, PropTypes } from 'react'
import Overlay from './Overlay'
export default class ImageViewer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Overlay {...this.props} >
                <div className="image-viewer">
                    <img src={this.props.src} />
                    {
                        this.props.text ? <p>{this.props.text}</p> : null
                    }
                </div>
            </Overlay>
        )
    }
}