import React, { Component, PropTypes } from 'react'
export default class FinancialProductDetail extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
    }
    componentDidMount(){

    }
    renderContent(type){
        //理财服务项目详情 0
        switch (type){
            case 0:
                return(
                    <div className="product-s1-detail">
                        <div className="product-text-item">
                            <span className="s1">截止日期:</span>
                            <span className="s2">以实际交易为准</span>
                        </div>
                        <div className="product-text-item">
                            <span className="s1">起息日期:</span>
                            <span className="s2">匹配成功T+1天开始计算利息</span>
                        </div>
                        <div className="product-text-item">
                            <span className="s1">加入下限:</span>
                            <span className="s2">100元起</span>
                        </div>
                        <div className="product-text-item">
                            <span className="s1">加入上限:</span>
                            <span className="s2">以实际交易为准</span>
                        </div>
                        <div className="product-text-item">
                            <span className="s1">赎回方式:</span>
                            <span className="s2">理财计划结束即可自动退出</span>
                        </div>
                        <div className="product-text-item">
                            <span className="s1">收益处理:</span>
                            <span className="s2">理财计划结束(包括回款完成、债权结束)返还账户</span>
                        </div>
                        <div className="product-text-item" style={{marginTop:'20px'}}>
                            <span className="s1">理财计划:</span>
                            <span className="s2 s3">是琥珀金服推出的“投资人在锁定期内对借款项目进行优先自动投资及到期退出或提前退出时优先自动转让债权”的服务计划,是便捷、高效的自动投标工具。</span>
                        </div>
                        <div className="product-text-item" style={{marginTop:'20px'}}>
                            <span className="s1">琥珀理财原理:</span>
                            <span className="s2 s3">在用户认可的标的范围内进行优先自动投标，且回款本息在相应期限内自动复投，省去投资人个人安排投资的时间和精力。期限结束后理财计划会自动完成债权转让退出。</span>
                        </div>
                    </div>
                )
            break;

        }

    }
    render() {
        return (
            <section className="level-2-wrap">
                {this.renderContent(this.props.type)}
            </section>
        )
    }
}