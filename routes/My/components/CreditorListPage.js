import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link,browserHistory} from 'react-router'
import TabBar,{TabBarItem} from 'components/TabBar'
import RootLoading from 'components/RootLoading'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import ListView from 'components/ListView'
import config from 'componentConfig'
export default class CreditorListPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
    }
    componentWillMount() {
        const props = this.props;
    }
    componentDidMount(){
    }
    render() {
        const props = this.props;
        return(
            <section className="level-2-wrap">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }

                </ReactCSSTransitionGroup>
                <TabBar>
                    <TabBarItem name="首投">
                        <CreditorItemPage userId={props.userId} creditorList={props.creditorList.type1} investId={props.params.investId} type={1} fetchCreditorlist={props.fetchCreditorlist} />
                    </TabBarItem>
                    <TabBarItem name="复投">
                        <CreditorItemPage userId={props.userId} creditorList={props.creditorList.type2} investId={props.params.investId} type={2} fetchCreditorlist={props.fetchCreditorlist} />
                    </TabBarItem>
                </TabBar>

            </section>
        )
    }
}

class CreditorItemPage extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const props = this.props;

            props.fetchCreditorlist({
                userId:props.userId,
                investId:props.investId,
                type:props.type,
                callback:()=>{

                }
            })


    }
    renderItem(item,index){
        return(
            <div className="creditor-list-item" key={index} onClick={()=>{
                                this.context.router.push({
                                    pathname:`/my/investmentrecord/creditorList${this.props.investId}/detail`,
                                    query:{
                                          type:this.props.type,
                                          contractNo:item.contractNo,
                                          amt:item.amt,
                                          name:item.name,
                                          idCard:item.idCard,
                                          borrowType:item.borrowType,
                                          limit:item.limit,
                                          originAmt:item.originAmt
                                    }
                                })
                            }}>
                <h2>{item.contractNo}</h2>
                <p className="p1">
                    <span>借款项目</span>
                    <span>借款期限</span>
                    <span>出借金额</span>
                </p>
                <p className="p2">
                    <span>{item.borrowType}</span>
                    <span>{item.limit}</span>
                    <span className="red">{item.amt}</span>
                </p>
                <p className="p3">
                    <span className="fl">借款人-{item.name}</span>
                    <span className="fr">{item.idCard}</span>
                </p>
            </div>
        )
    }
    render() {
        const iScrollHeight = config.windowHeight - config.tabBarHeight
        return(
            <section className="creditor-list-wrap">
                <ListView
                    dataSource={this.props.creditorList}
                    renderRow={this.renderItem.bind(this)}
                    wrapperClass='invest-record-wrap'
                    style={{height:iScrollHeight}}
                >
                </ListView>
            </section>
        )
    }

}
CreditorItemPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};