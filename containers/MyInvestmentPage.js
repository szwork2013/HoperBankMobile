import React, { Component, PropTypes } from 'react'
import ListView from '../components/ListView'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from '../components/TabBar'
import InvestRecordList from './InvestRecordList'
class MyInvestmentPage extends Component {
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
            <TabBarItem name="待匹配">
              <InvestRecordList type="1" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="待划拨">
              <InvestRecordList type="2" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="结算中">
              <InvestRecordList type="3" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="已完成">
              <InvestRecordList type="4" id={props.account.userId}/>
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

})(MyInvestmentPage)
