import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUser, loadStarred } from '../actions'
import TabBar,{TabBarItem} from '../components/TabBar'
import FinancialList from './FinancialList'
import FinancialServicesList from './FinancialServicesList'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
            <div style={{height:'100%'}}>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <TabBar>
                    <TabBarItem name="理财服务">
                        <FinancialList />
                    </TabBarItem>
                    <TabBarItem name="优选服务">
                        <FinancialServicesList type="9" />
                    </TabBarItem>
                    <TabBarItem name="债权转让" >
                        <FinancialServicesList type="5" />
                    </TabBarItem>
                </TabBar>
            </div>
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
