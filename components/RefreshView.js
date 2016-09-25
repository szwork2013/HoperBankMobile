import React, { Component, PropTypes } from 'react'
export default class RefreshView extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        display:PropTypes.bool
    }
    static defaultProps = {
        display:false
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
