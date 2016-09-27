import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import TabBar,{TabBarItem} from 'components/TabBar'
import TeamList from './TeamList'
export default class TeamListPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <section className="level-2-wrap">
          <TabBar>
            <TabBarItem name="直接队友">
              <TeamList type="1" {...this.props} />
            </TabBarItem>
            <TabBarItem name="间接队友">
              <TeamList type="2" {...this.props} />
            </TabBarItem>
          </TabBar>
        </section>
    )
  }
}