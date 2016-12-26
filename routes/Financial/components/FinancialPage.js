import React, { Component, PropTypes } from 'react'
import TabBar,{TabBarItem} from 'components/TabBar'
import FinancialList from './FinancialList'
import FinancialServicesList from './FinancialServicesList'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class FinancialPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{height:'100%',width:"100%"}}>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <TabBar>
                    <TabBarItem name="理财服务" >
                        <FinancialList />
                    </TabBarItem>
                    <TabBarItem name="优选服务">
                        <FinancialServicesList type="9" />
                    </TabBarItem>
                </TabBar>
            </div>
        )
    }
}

module.exports = FinancialPage