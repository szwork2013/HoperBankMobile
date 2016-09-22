import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import TeamList from './TeamList'
class TeamListPage extends Component {
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
          <TabBar>
            <TabBarItem name="直接队友">
              <TeamList type="1" id={this.props.routeParams.userId} />
            </TabBarItem>
            <TabBarItem name="间接队友">
              <TeamList type="2" id={this.props.routeParams.userId} />
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

})(TeamListPage)
