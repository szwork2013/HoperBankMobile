import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../actions'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll';
class FinancialList extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        //loadData(this.props)

    }
    componentDidMount(){

    }

    componentWillReceiveProps(nextProps) {

    }
    onScrollStart() {
        console.log("iScroll starts scrolling")
    }
    render() {
        return (
            <ReactIScroll iScroll={iScroll}
                          options={this.props.options}
                          onScrollStart={this.onScrollStart}>
                <ul className="financial-ul">
                    <li>12121212121</li>
                </ul>
            </ReactIScroll>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        aa:'bb',
        options: {
            mouseWheel: true,
            scrollbars: true
        }
    }
}

export default connect(mapStateToProps, {

})(FinancialList)
