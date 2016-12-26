import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import config from 'componentConfig'
export default class QaqList extends Component {
    constructor(props) {
        super(props)
        this.state={
            data:[]
        }
    }
    componentWillMount() {
        fetch('/static/feed/qaq.json')
            .then((res)=>res.json())
            .then((data)=>{
                this.setState({
                    data:data[this.props.type]
                })
            })
    }

    clickHandle(index){
        $(this.refs[`item${index}`]).toggleClass('active');
    }
    render(){
        return(
            <div className="" >
                {this.state.data.map((item,index)=>{
                    return(
                        <div className="qaq-item" ref={`item${index}`} key={index} onClick={this.clickHandle.bind(this,index)}>
                            <div className="qaq-question">{index+1}.{item.question}</div>
                            <div className="qaq-answer">{item.answer}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}