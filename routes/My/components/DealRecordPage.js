import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import DealRecordList from './DealRecordList'
import Selector from 'components/Selector'
class DealRecordPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
        <section className="level-2-wrap">
          <Selector />
          <TabBar>
            <TabBarItem name="充值记录">
              <DealRecordList type="1" />
            </TabBarItem>
            <TabBarItem name="提现记录">
              <DealRecordList type="2" />
            </TabBarItem>
            <TabBarItem name="投资记录">
              <DealRecordList type="3" />
            </TabBarItem>
          </TabBar>
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

})(DealRecordPage)
