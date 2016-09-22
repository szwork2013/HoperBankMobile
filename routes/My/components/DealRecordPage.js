import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import DealRecordList from './DealRecordList'
class DealRecordPage extends Component {
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
          <TabBar>
            <TabBarItem name="充值记录">
              <DealRecordList type="1" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="提现记录">
              <DealRecordList type="2" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="投资记录">
              <DealRecordList type="3" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="债权记录">
              <DealRecordList type="4" id={props.account.userId}/>
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
