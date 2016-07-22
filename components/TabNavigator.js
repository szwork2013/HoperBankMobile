import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
export default class TabNavigator extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const selected = this.props.selected
    function test(str){
      return new RegExp(selected).test(str)
    }

    return (
        <section className="main-foot-nav">
          <ul>
            <li className={selected =='/home' ? 'active':''}>
              <Link to="/home">
                <i className="i1"></i>
                <p>首页</p>
              </Link>
            </li>
            <li className={selected =='/financial' ? 'active':''}>
              <Link to="/financial">
                <i className="i2"></i>
                <p>理财</p>
              </Link>
            </li>
            <li className={selected =='/borrow' ? 'active':''}>
              <Link to="/borrow">
                <i className="i3"></i>
                <p>借款</p>
              </Link>
            </li>
            <li className={selected =='/my' ? 'active':''}>
              <Link to="/my" >
                <i className="i4"></i>
                <p>我的</p>
              </Link>
            </li>
          </ul>
        </section>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    selected: state.routing.locationBeforeTransitions.pathname
  }
}

export default connect(mapStateToProps)(TabNavigator)
