import React, { Component, PropTypes } from 'react'
import Auth from 'utils/auth'
import ReactSwipe from 'react-swipe';
import config from 'container/componentConfig'
import Overlay from 'components/Overlay'
class SafePage extends Component {
    constructor(props) {
        super(props)
        this.state={
            selected:0,
            hiddenAreaStatus1:false,
            hiddenAreaStatus2:false
        }
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    componentWillMount() {

    }
    render() {
        const swipeOptions = {
            continuous: true,
            callback:(index,elm)=>{
                this.setState({
                    selected:index
                })
            },
            startSlide:0
        }
        return (
            <section className="safe-wrap">
                <Overlay display={this.state.hiddenAreaStatus1 || this.state.hiddenAreaStatus2}>
                    <div className="tip-con">
                        <div style={{display:this.state.hiddenAreaStatus1 ? 'block':'none'}}>
                            <div className="tip-con-1">
                                <div className="part-left">
                                    <div className="safe-icon i1"></div>
                                    <p>“E盾”</p>
                                    <p>计划资金</p>
                                </div>
                                <div className="part-right">
                                    <p>
                                        琥珀金服为保障平台投资人利益设立的用于逾期债权收购的资金计划。在借款人发生逾期的极端情况下，“E盾”计划的储备资金将被用来收购平台发生逾期或违约的项目资产，保障广大投资人的权益。
                                    </p>
                                </div>
                            </div>
                            <div className="tip-con-1">
                                <div className="part-left">
                                    <div className="safe-icon i2"></div>
                                    <p>银行级</p>
                                    <p>风控系统</p>
                                </div>
                                <div className="part-right">
                                    <p>
                                        来自国内知名平台的风控精英团队，采用美国FICO信用评分技术、德国IPC微贷技术与数据分析相结合，深度分析借款个体的综合资信能力和信用状况；接入同盾（反欺诈）欺诈风险识别系统，最大限度的阻止风险客户的导入。
                                    </p>
                                </div>
                            </div>
                            <div className="tip-con-1">
                                <div className="part-left">
                                    <div className="safe-icon i4"></div>
                                    <p>技术</p>
                                    <p>安全保障</p>
                                </div>
                                <div className="part-right">
                                    <p>
                                        自助研发数据库硬件灾备热切安全部署硬件模块，对系统数据进行全量备份。基于SSL证书（HTTPS）安全传输，保证传输信道安全性，杜绝任何中间人监听行业。
                                    </p>
                                </div>
                            </div>
                            <div className="tip-con-1">
                                <div className="part-left">
                                    <div className="safe-icon i5"></div>
                                    <p>法律</p>
                                    <p>安全保障</p>
                                </div>
                                <div className="part-right">
                                    <p>
                                        在内控、合规方面聘请法律经验丰富、法学理论扎实的人员，参与对外合同的拟定、审核，把控平台运营的法律风险。平台加强与国内知名的金融律师事务所合作，建立长期的战略伙伴关系，为投资者提供优质的法律支持。
                                    </p>
                                </div>
                            </div>
                            <div className="tip-con-1">
                                <div className="part-left">
                                    <div className="safe-icon i6"></div>
                                    <p>项目</p>
                                    <p>严格审查</p>
                                </div>
                                <div className="part-right">
                                    <p>
                                        通过实地调查、资料审核、背景调查、还款能力测试、过程监督和风控委员会评审6个方面严格审查每个贷款项目。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="safe-direction" style={{display:this.state.hiddenAreaStatus2 ? 'block':'none'}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;琥珀金服P2P平台为不同风险水平的资金需求者匹配适合的资金借出方，为投资需求方提供不同的投资理财渠道。出借方和借款方都可以通过琥珀金服找到自己的资金需求。琥珀金服为双方搭建资金供需的信息平台，提供需求对接，撮合借款双方达成交易。琥珀金服提供信息服务，是信息中介平台。<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出借人通过平台充值，将自身银行账户上的出借资金托管在第三方银行账户上，平台将出借资金撮合匹配后，将资金借给借款人在第三方的托管账户，由第三方托管账户转给借款人所在的银行账户，实现出借过程；同理，借款人到期还款，将资金存入自身银行账户中，通过平台充值，充值后资金托管在第三方账户中，资金由借款人在第三方的托管账户转入出借人的第三方托管账户，出借人通过提现，由第三方托管账户转入出借人银行账户，完成还款过程。<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;投资者的资金会分散至不同的借款人，减少违约风险，另一方面，每个借款人的资金来源于不同的投资者，投资者的资金进入后第一时间根据时间、期限、金额进行一对多的撮合，整个过程透明高效，客户可以打印交易流水，看到资金去向，做到真正的放心安心。
                        </p>
                        <div className="close" onClick={()=>this.setState({hiddenAreaStatus1:false,hiddenAreaStatus2:false})}></div>
                    </div>

                </Overlay>
                <ReactSwipe className="carousel swiper-wrapper" ref="reactSwipe" swipeOptions={swipeOptions}>
                    <div className="safe-item-1">
                        <img src="/static/img/safe/b1.jpg" />
                    </div>
                    <div className="safe-item-2">
                        <img src="/static/img/safe/b2.jpg" />
                        <p onClick={
                            ()=>{
                                this.setState({
                                    hiddenAreaStatus1:true,
                                    hiddenAreaStatus2:false
                                })
                            }
                            }>
                            了解更多
                        </p>
                    </div>
                    <div className="safe-item-3">
                        <img src="/static/img/safe/b3.jpg" />
                        <p onClick={
                            ()=>{
                                this.setState({
                                    hiddenAreaStatus1:false,
                                    hiddenAreaStatus2:true
                                })
                            }
                            }>了解更多</p>
                    </div>
                    <div className="safe-item-4">
                        <img src="/static/img/safe/b4.jpg" />
                        <div className="safe-item-button"
                             style={{display:Auth.logged() ? 'none':'block',left:(config.windowWidth-100)/2}}
                             onClick={()=>{
                                this.context.router.push('/register');
                             }}
                        >
                            立即注册
                        </div>
                    </div>
                </ReactSwipe>
                <div className="carousel-dots" style={{left:(config.windowWidth - 85)/2}}>
                    <div className={`dot ${this.state.selected===0 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===1 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===2 && 'active'}`}></div>
                    <div className={`dot ${this.state.selected===3 && 'active'}`}></div>
                </div>
            </section>
        )
    }
}

module.exports = SafePage