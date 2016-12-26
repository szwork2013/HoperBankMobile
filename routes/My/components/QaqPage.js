import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import QaqList from './QaqList'
export default class QaqPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
        <section className="level-2-wrap">
          <TabBar>
            <TabBarItem name="注册认证">
              <QaqList type="1" />
            </TabBarItem>
            <TabBarItem name="充值提现">
              <QaqList type="2" />
            </TabBarItem>
            <TabBarItem name="投资、赎回">
              <QaqList type="3" />
            </TabBarItem>
            <TabBarItem name="安全保障">
              <QaqList type="4" />
            </TabBarItem>
          </TabBar>
        </section>
    )
  }
}