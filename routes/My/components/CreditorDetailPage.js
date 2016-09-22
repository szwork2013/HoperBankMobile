import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link,browserHistory} from 'react-router'
import RootLoading from 'components/RootLoading'
import config from 'componentConfig'
export default class CreditorDetailPage extends Component {
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
        const props = this.props,
            data = props.location.query;
        return(
            <section className="level-2-wrap">
                <div className="creditor-detail-wrap">
                    <h2>{data.contractNo}</h2>
                    <p className="money">{data.amt}</p>
                    <p className="p1">出借金额</p>
                    <p><span className="fl">类型</span><span className="fr">{data.type==1?'首投':'复投'}</span></p>
                    <p><span className="fl">借款人</span><span className="fr">{data.name}</span></p>
                    <p><span className="fl">借款人身份证</span><span className="fr">{data.idCard}</span></p>
                    <p><span className="fl">借款项目</span><span className="fr">{data.borrowType}</span></p>
                    <p><span className="fl">借款期限</span><span className="fr">{data.limit}</span></p>
                    <p><span className="fl">借款金额</span><span className="fr">{data.originAmt}</span></p>
                </div>
            </section>
        )
    }
}
CreditorDetailPage.propTypes = {

}
CreditorDetailPage.defaultProps = {

}