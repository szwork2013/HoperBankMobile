import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import ReturnPlanRecordList from './ReturnPlanRecordList'
class ReturnedPlanRecordPage extends Component {
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
            <TabBarItem name="待生效">
              <ReturnPlanRecordList type="0" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="已生效待收款">
              <ReturnPlanRecordList type="1" id={props.account.userId}/>
            </TabBarItem>
            <TabBarItem name="已收款">
              <ReturnPlanRecordList type="2" id={props.account.userId}/>
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

})(ReturnedPlanRecordPage)
