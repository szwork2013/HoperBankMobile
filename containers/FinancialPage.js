import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../actions'
import TabBar,{TabBarItem} from '../components/TabBar'
import FinancialList from './FinancialList'
import FinancialServicesList from './FinancialServicesList'
class FinancialPage extends Component {
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


  render() {
    return (
            <TabBar>
              <TabBarItem name="理财服务">
                <FinancialList />
              </TabBarItem>
              <TabBarItem name="优选服务">
                  <FinancialServicesList />
              </TabBarItem>
            </TabBar>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    aa:'bb'
  }
}

export default connect(mapStateToProps, {

})(FinancialPage)
