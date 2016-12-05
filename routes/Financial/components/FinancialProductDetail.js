import React, { Component, PropTypes } from 'react'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe';
export default class FinancialProductDetail extends Component {
    constructor(props) {
        super(props)
    }
    renderContent(type){
        const data = this.props.productInfo;
        //理财服务项目详情 0
        switch (parseInt(type)){
            case 1:
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

            //由于优选项目和债权转让使用同样的详情页，那么在类型5和9的时候都是使用InvestInfoPage，所以5的时候不写break,穿透到9
            case 5:
            case 9:
                return <InvestInfoPage data={data} />
                break;
            default:
                return <div></div>
        }

    }
    render() {
        return (
            <section className="level-2-wrap">
                <ReactIScroll iScroll={iScroll}>
                    {this.renderContent.bind(this)(this.props.params.productType)}
                </ReactIScroll>
            </section>
        )
    }
}
const InvestInfoPage = (props)=>{
    var productType= '';
    const data = props.data;
    const xdProductType = parseInt(data.xdProductType);
    switch (xdProductType){
        case 1:
            productType = '消费薪金贷'
            break;
        case 2:
            productType = '消费精英贷'
            break;
        case 3:
            productType = '悦楼薪金贷'
            break;
        case 4:
            productType = '悦楼生意贷'
            break;
        case 5:
            productType = '生意贷'
            break;
        case 6:
            productType = '社保贷'
            break;
        case 7:
            productType = '保单贷'
            break;
        case 8:
            productType = '车主贷'
            break;
        case 9:
            productType = '企业订单贷'
            break;
        case 10:
            productType = '险商借'
            break;
    }

    if(xdProductType===9 || xdProductType===10){
        return(
            <div className="product-s1-detail">
                <div className="product-text-item no-bg">
                    <span className="s1">借款信息</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">借款类型</span>
                    <span className="s2 text-right">{productType}</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">借款期限</span>
                    <span className="s2 text-right">{data.productCycle}个月</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">借款用途</span>
                    <span className="s2 text-right">{data.loanApplication}</span>
                </div>
                <div className="product-text-item no-bg">
                    <span className="s1">企业信息</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">企业名字</span>
                    <span className="s2 text-right">{data.companyName || ''}</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">企业地址</span>
                    <span className="s2 text-right">{data.companyAddress || ''}</span>
                </div>
                <div className="product-text-item no-bg">
                    <span className="s1">企业法人/负责人信息</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">法人/负责人名字</span>
                    <span className="s2 text-right">{data.realName || ''}</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">职位级别</span>
                    <span className="s2 text-right">{data.position}</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">任职部门</span>
                    <span className="s2 text-right">{data.dept}</span>
                </div>
                <div className="product-text-item no-bg">
                    <span className="s1">其它审核信息</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">企业收入证明</span>
                    <span className="s2 text-right">已验证</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">企业经营地证明</span>
                    <span className="s2 text-right">已验证</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">信用报告</span>
                    <span className="s2 text-right">已验证</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">购销合同</span>
                    <span className="s2 text-right">已验证</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">身份证信息</span>
                    <span className="s2 text-right">已验证</span>
                </div>
                <div className="product-text-item">
                    <span className="s1">营业执照</span>
                    <span className="s2 text-right">已验证</span>
                </div>
            </div>
        )
    }

    return(
        <div className="product-s1-detail">
            <div className="product-text-item no-bg">
                <span className="s1">借款信息</span>
            </div>
            <div className="product-text-item">
                <span className="s1">借款类型</span>
                <span className="s2 text-right">{productType}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">借款期限</span>
                <span className="s2 text-right">{data.productCycle}个月</span>
            </div>
            <div className="product-text-item">
                <span className="s1">借款用途</span>
                <span className="s2 text-right">{data.loanApplication}</span>
            </div>
            <div className="product-text-item no-bg">
                <span className="s1">用户信息</span>
            </div>
            <div className="product-text-item">
                <span className="s1">用户名</span>
                <span className="s2 text-right">{data.realName}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">性别</span>
                <span className="s2 text-right">{data.sex == 1?'男':'女'}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">学历</span>
                <span className="s2 text-right">{data.degree}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">现住址</span>
                <span className="s2 text-right">{data.nowProvince + data.nowCity + data.nowArea}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">户籍地:</span>
                <span className="s2 text-right">{data.houseProvince+ data.houseCity + data.houseArea}</span>
            </div>
            <div className="product-text-item no-bg">
                <span className="s1">工作信息</span>
            </div>
            <div className="product-text-item">
                <span className="s1">工作单位</span>
                <span className="s2 text-right">{data.companyName}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">职位级别</span>
                <span className="s2 text-right">{data.position}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">任职部门</span>
                <span className="s2 text-right">{data.dept}</span>
            </div>
            <div className="product-text-item">
                <span className="s1">收入范围</span>
                <span className="s2 text-right">{data.wages}</span>
            </div>
        </div>
    )
}
