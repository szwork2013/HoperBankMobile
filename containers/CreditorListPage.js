import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link,browserHistory} from 'react-router'
import TabBar,{TabBarItem} from '../components/TabBar'
import RootLoading from '../components/RootLoading'
import config from './componentConfig'
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
                <TabBar>
                    <TabBarItem name="首投">
                        <CreditorItemPage userId={props.userId} creditorList={props.creditorList.type1} investId={props.location.query.investId} type={1} fetchCreditorlist={props.fetchCreditorlist} />
                    </TabBarItem>
                    <TabBarItem name="复投">
                        <CreditorItemPage userId={props.userId} creditorList={props.creditorList.type2} investId={props.location.query.investId} type={2} fetchCreditorlist={props.fetchCreditorlist} />
                    </TabBarItem>
                </TabBar>

            </section>
        )
    }
}

class CreditorItemPage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const props = this.props;
        if(props.creditorList.length===0){
            props.fetchCreditorlist({
                userId:props.userId,
                investId:props.investId,
                type:props.type,
                callback:()=>{

                }
            })
        }

    }
    render() {
        return(
            <section className="creditor-list-wrap">
                {
                    this.props.creditorList.map((item,index)=>{
                        return(
                            <div className="creditor-list-item" key={index}>
                                <h2>{item.serialNo}</h2>
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
                    })
                }
            </section>
        )
    }

}
