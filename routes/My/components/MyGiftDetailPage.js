import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import GiftList from './MyGiftDetailList'
class MyGiftDetailPage extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
  }
  componentDidMount(){
  }
  render() {
    const props = this.props;
      const couponType = this.props.routeParams.couponType
    return (
        <section className="level-2-wrap">
          <TabBar>
            <TabBarItem name="可使用">
              <GiftList couponType={couponType} type="1" />
            </TabBarItem>
            <TabBarItem name="已使用">
              <GiftList couponType={couponType} type="2" />
            </TabBarItem>
            <TabBarItem name="已过期">
              <GiftList couponType={couponType} type="3" />
            </TabBarItem>
          </TabBar>
        </section>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
  }
}
export default connect(mapStateToProps, {

})(MyGiftDetailPage)
