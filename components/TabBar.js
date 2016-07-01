import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
export default class TabBar extends Component {

  constructor(props) {
    super(props)
  }
  jumpTo(route){
    //browserHistory.push('/'+route)
  }
  render() {
    const selected = this.props.selected
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
              <a href="#">
                <i className="i2"></i>
                <p>理财</p>
              </a>
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

export default connect(mapStateToProps)(TabBar)

/*
List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
}

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...'
}
*/
