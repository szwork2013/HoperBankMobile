import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { fetchAccount } from '../actions'
import IconButton from '../components/IconButton'
class PersonalPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  componentDidMount(){

  }
  render() {
    return (
        <section className="level-2-wrap">

        </section>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, {
  fetchAccount
})(PersonalPage)
