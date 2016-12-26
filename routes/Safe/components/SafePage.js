import React, { Component, PropTypes } from 'react'
import Auth from 'utils/auth'
import ReactSwipe from 'react-swipe';
import config from 'containers/componentConfig'
import Overlay from 'components/Overlay'
class SafePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            selected:0,
            hiddenAreaStatus1:false,
            hiddenAreaStatus2:false
        }
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    componentWillMount() {

    }
    render() {
        const swipeOptions = {
            continuous: true,
            callback:(index,elm)=>{
                this.setState({
                    selected:index
                })
            },
            startSlide:0
        }
        return (
            <section className="safe-wrap">
                <Overlay display={this.state.hiddenAreaStatus1 || this.state.hiddenAreaStatus2}>
                </Overlay>
                <ReactSwipe className="carousel swiper-wrapper" ref="reactSwipe" swipeOptions={swipeOptions}>
                    <div className="safe-item-1">
                        <img src="/static/img/safe/safe01.png" />
                    </div>
                    <div className="safe-item-2">
                        <img src="/static/img/safe/safe02.png" />
                    </div>
                    <div className="safe-item-3">
                        <img src="/static/img/safe/safe03.png" />
                    </div>
                    <div className="safe-item-4">
                        <img src="/static/img/safe/safe04.png" />
                    </div>
                    <div className="safe-item-5">
                        <img src="/static/img/safe/safe05.png" />
                    </div>
                    <div className="safe-item-6">
                        <img src="/static/img/safe/safe06.png" />
                    </div>
                    <div className="safe-item-7">
                        <img src="/static/img/safe/safe07.png" />
                    </div>
                </ReactSwipe>
                <div className="carousel-dots" style={{left:(config.windowWidth - 131)/2}}>
                    <div className={`dot ${this.state.selected===0 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===1 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===2 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===3 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===4 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===5 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===6 && 'active'}`}></div>
                </div>
            </section>
        )
    }
}

module.exports = SafePage