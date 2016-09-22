import React, { Component, PropTypes } from 'react'
import ListView from 'components/ListView'
import { connect } from 'react-redux'
import TabBar,{TabBarItem} from 'components/TabBar'
import InvestRecordList from './InvestRecordList'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class MyInvestmentPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            investId:null
        }
        this.setInvestId = this.setInvestId.bind(this);
    }
    componentWillMount() {
        console.log(this.props)
    }
    componentDidMount(){

    }
    setInvestId(id){
        this.setState({
            investId:id
        })
    }
    render() {
        const props = this.props;
        return (
            <section className="level-2-wrap">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {props.children && React.cloneElement(props.children, {
                        fetchCreditorlist:props.fetchCreditorlist,
                        creditorList:props.creditorList,
                        userId:props.account.userId
                    })}
                </ReactCSSTransitionGroup>
                <TabBar>
                    <TabBarItem name="待匹配">
                        <InvestRecordList type="1" id={props.account.userId}/>
                    </TabBarItem>
                    <TabBarItem name="待划拨">
                        <InvestRecordList setInvestId={this.setInvestId} type="2" id={props.account.userId}/>
                    </TabBarItem>
                    <TabBarItem name="结算中">
                        <InvestRecordList setInvestId={this.setInvestId} type="3" id={props.account.userId}/>
                    </TabBarItem>
                    <TabBarItem name="已完成">
                        <InvestRecordList setInvestId={this.setInvestId} type="4" id={props.account.userId}/>
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
