import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
class MyGiftPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {

  }
  componentDidMount(){

  }
  render() {
    const props = this.props;
    return (
        <section className="level-2-wrap">
          <Link className="gift-list-item" to="myGiftDetail.html?couponType=3">
            <div className="part-left">
              <div className="abs"></div>
              <p className="name">红包</p>
            </div>
            <div className="part-right">
              <p>
                <span>可用</span>
                <span>已用</span>
                <span>过期</span>
              </p>
              <p>
                <span className="s1">4</span>
                <span className="s2">0</span>
                <span className="s3">0</span>
              </p>
              <div className="abs"></div>
            </div>
          </Link>
        </section>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    account:state.account
  }
}

export default connect(mapStateToProps, {

})(MyGiftPage)
