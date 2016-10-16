import React, { Component, PropTypes } from 'react'
import {BaseButton} from 'components/Button'
import { browserHistory } from 'react-router'
export default class DealResultPage extends Component {
    constructor(props) {
        super(props)
        this.renderPayResult = this.renderPayResult.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    static propTypes = {
        fetchAccount:PropTypes.func.isRequired
    }
    componentWillMount() {
        //交易成功后重新获取个人信息刷新账户余额
        this.props.fetchAccount()
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
        const queryParams = props.location.state;
        return(
            <section className="deal-result-container">
                <div className="deal-result-top">
                    <img src="/static/img/success2.png" width="80" />
                    <p>恭喜你，投资成功</p>
                </div>
                <div className="deal-success-wrap">
                    <div className="deal-success-item">
                        <span className="fl">投资产品</span>
                        <span className="fr" style={{width:'70%',height:'22px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',textAlign:'right'}}>{queryParams.product}</span>
                    </div>
                    <div className="deal-success-item">
                        <span className="fl">购买金额</span>
                        <span className="fr">{queryParams.amt + '元'}</span>
                    </div>
                    <div className="deal-success-item">
                        <span className="fl">预计收益</span>
                        <span className="fr">{queryParams.sy + '元'}{queryParams.couponSy && '+' + queryParams.couponSy + '元'}</span>
                    </div>
                </div>
                <div className="deal-result-bottom">
                    <BaseButton text="确定"
                                 onClick={()=>{browserHistory.replace('/my/investmentrecord')}} />
                </div>
            </section>
        )
    }
}