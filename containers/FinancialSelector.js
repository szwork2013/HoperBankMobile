import React, { Component, PropTypes } from 'react'
export default class FinancialSelector extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {

    }
    render(){
        return(
            <ul className="financial-nav">
                <li className="active">默认</li>
                <li>年利率<i></i></li>
                <li>期限<i></i></li>
                <li>进度<i></i></li>
            </ul>
        )
    }
}