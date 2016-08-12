import React, { Component, PropTypes } from 'react'
import {BaseButton} from '../components/Button'
import {fetchAccount} from '../actions'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
export default class DealResultPage extends Component {
    constructor(props) {
        super(props)
        this.renderPayResult = this.renderPayResult.bind(this);
    }
    componentWillMount() {
        //交易成功后重新获取个人信息刷新账户余额
        this.props.fetchAccount(this.props.userId)
    }
    componentDidMount(){

    }
    render() {
        return (
            <section className="level-2-wrap">
                {this.renderPayResult()}
            </section>
        )
    }
    renderPayResult(){
        const props = this.props;
        return(
            <section className="deal-result-container">
                <div className="deal-result-top">
                    <img src="/static/img/success2.png" width="80" />
                    <p>恭喜你，投资成功</p>
                </div>
                <div className="deal-success-wrap">
                    <div className="deal-success-item">
                        <span className="fl">投资产品</span>
                        <span className="fr">{props.location.query.product}</span>
                    </div>
                    <div className="deal-success-item">
                        <span className="fl">购买金额</span>
                        <span className="fr">{props.location.query.amt + '元'}</span>
                    </div>
                    <div className="deal-success-item">
                        <span className="fl">预计收益</span>
                        <span className="fr">{props.location.query.sy + '元'}</span>
                    </div>
                </div>
                <div className="deal-result-bottom">
                    <BaseButton text="确定"
                                 onClick={()=>{browserHistory.goBack()}} />
                </div>
            </section>
        )
    }
    renderChargeResult(){

    }
    renderWithDrawResult(){

    }
}
DealResultPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        userId:state.account.userId
    }
}
export default connect(mapStateToProps,{
    fetchAccount
})(DealResultPage)
