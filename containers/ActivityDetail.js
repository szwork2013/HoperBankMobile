import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {fetchActivityList} from '../actions'
import RootLoading from '../components/RootLoading'
export default class ActivityDetail extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
    }
    componentWillMount() {

    }
    componentDidMount(){

    }
    render() {
        const props = this.props;
        return (
            <section className="level-2-wrap">
                123
                <iframe>
                    
                </iframe>
            </section>
        )
    }
}