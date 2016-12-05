import React, { Component, PropTypes } from 'react'
import RootLoading from 'components/RootLoading'
import config from 'componentConfig'
import {BaseButton,TextButton} from 'components/Button'
import Overlay from 'components/Overlay'
import { browserHistory } from 'react-router'
export default class RiskTestPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            overlayShouldShow:false,
            resultTxt:''
        }
    }
    static propTypes = {
        asyncRisk: PropTypes.func
    }
    render(){
        return(
        <div>
            <div className="risk-wrap" >
                <h1>风险评测问卷</h1>
                <p>本问卷旨在了解您对投资风险的承受意愿及能力。问卷结果可能不能完全呈现您面对投资风险的真正态度，您可和您的投资顾问或我们的客服进一步沟通。</p>
                <form ref="form">
                    <div className="risk-item">
                        <h2>1、您目前所处的年龄阶段为___?</h2>
                        <p><label><input type="radio" name="q1" value="1" /><span>A. 55岁以上</span></label></p>
                        <p><label><input type="radio" name="q1" value="2" /><span>B. 40-55岁</span></label></p>
                        <p><label><input type="radio" name="q1" value="3" /><span>C. 30-40岁</span></label></p>
                        <p><label><input type="radio" name="q1" value="4" /><span>D. 30岁以下</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>2、您可以投资的资金量___?</h2>
                        <p><label><input type="radio" name="q2" value="1" /><span>A. 10万元（含）以下</span></label></p>
                        <p><label><input type="radio" name="q2" value="2" /><span>B. 10万至100万（含）</span></label></p>
                        <p><label><input type="radio" name="q2" value="3" /><span>C. 100万至500万（含）</span></label></p>
                        <p><label><input type="radio" name="q2" value="4" /><span>D. 500万以上</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>3、您家庭的年收入___?</h2>
                        <p><label><input type="radio" name="q3" value="1" /><span>A. 10万元（含）以下</span></label></p>
                        <p><label><input type="radio" name="q3" value="2" /><span>B. 10万至20万（含）</span></label></p>
                        <p><label><input type="radio" name="q3" value="3" /><span>C. 20万至50万（含）</span></label></p>
                        <p><label><input type="radio" name="q3" value="4" /><span>D. 50万以上</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>4、您曾投资过的风险最高的产品是___?</h2>
                        <p><label><input type="radio" name="q4" value="1" /><span>A. 储蓄、银行理财产品、货币基金等风险极小的现金管理工具</span></label></p>
                        <p><label><input type="radio" name="q4" value="2" /><span>B. 债券或债券类基金、固定收益信托等</span></label></p>
                        <p><label><input type="radio" name="q4" value="3" /><span>C. 股票或股票型基金</span></label></p>
                        <p><label><input type="radio" name="q4" value="4" /><span>D. 期货或期货类基金、PE、房地产基金、艺术品基金等另类投资产品</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>5、您一般投资的期限为___?</h2>
                        <p><label><input type="radio" name="q5" value="1" /><span>A. 1年以内 </span></label></p>
                        <p><label><input type="radio" name="q5" value="2" /><span>B. 1-3年（包括3年）</span></label></p>
                        <p><label><input type="radio" name="q5" value="3" /><span>C. 3-5年（包括5年）</span></label></p>
                        <p><label><input type="radio" name="q5" value="4" /><span>D. 5年以上</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>6、您的投资目的是什么?</h2>
                        <p><label><input type="radio" name="q6" value="1" /><span>A. 超过通货膨胀就好（每年5%左右）</span></label></p>
                        <p><label><input type="radio" name="q6" value="2" /><span>B. 获取较稳定收益（每年10%左右）</span></label></p>
                        <p><label><input type="radio" name="q6" value="3" /><span>C. 获取较高收益（每年20%左右）</span></label></p>
                        <p><label><input type="radio" name="q6" value="4" /><span>D. 博取高收益（每年30% 以上）</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>7、您投资时，能接受一年内的最大损失是多少?</h2>
                        <p><label><input type="radio" name="q7" value="1" /><span>A. 跌幅10%以内</span></label></p>
                        <p><label><input type="radio" name="q7" value="2" /><span>B. 跌幅10%~20%间 </span></label></p>
                        <p><label><input type="radio" name="q7" value="3" /><span>C. 跌幅20%~30%间</span></label></p>
                        <p><label><input type="radio" name="q7" value="4" /><span>D. 跌幅30%以上</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>8、未来3年里平均收益、最好和最坏的收益情况如下，您会选择哪种投资产品?</h2>
                        <p><label><input type="radio" name="q8" value="1" /><span>A. 平均年收益率为2%，最好情况3%，最坏情况1% </span></label></p>
                        <p><label><input type="radio" name="q8" value="2" /><span>B. 平均年收益率为6%，最好情况13%，最坏情况-2%</span></label></p>
                        <p><label><input type="radio" name="q8" value="3" /><span>C. 平均年收益率为8%，最好情况53%，最坏情况-35%</span></label></p>
                        <p><label><input type="radio" name="q8" value="4" /><span>D. 平均年收益率为10%，最好情况65%，最坏情况-45%</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>9、您家庭的月生活消费支出约占月总收入的___?</h2>
                        <p><label><input type="radio" name="q9" value="1" /><span>A. 71%-100%以上</span></label></p>
                        <p><label><input type="radio" name="q9" value="2" /><span>B. 51%-70%</span></label></p>
                        <p><label><input type="radio" name="q9" value="3" /><span>C. 21%-50%</span></label></p>
                        <p><label><input type="radio" name="q9" value="4" /><span>D. 0-20%</span></label></p>
                    </div>
                    <div className="risk-item">
                        <h2>10、您有多少年投资银行理财产品、信托产品、股票、基金、外汇、金融衍生产品等风险投资产品的经验?</h2>
                        <p><label><input type="radio" name="q10" value="1" /><span>A. 没有经验</span></label></p>
                        <p><label><input type="radio" name="q10" value="2" /><span>B. 少于2年</span></label></p>
                        <p><label><input type="radio" name="q10" value="3" /><span>C. 2(含)-5年</span></label></p>
                        <p><label><input type="radio" name="q10" value="4" /><span>D. 5年及以上</span></label></p>
                    </div>
                </form>

                <div className="risk-item button-item">
                    <button className={`base-button`} type="submit" onClick={this.asyncSubmit.bind(this)} >提交</button>
                </div>

            </div>
            <Overlay display={this.state.overlayShouldShow}>
                <div className="risk-result-wrap">
                    <div className="risk-result-title">风险等级结果</div>
                    <div className="risk-result-content" dangerouslySetInnerHTML={{__html: this.state.resultTxt}}>
                    </div>
                    <div className="risk-result-button">
                        <button className={`base-button`} type="submit" onClick={()=>{this.setState({overlayShouldShow:false});browserHistory.goBack()}} >确定</button>
                    </div>
                </div>
            </Overlay>
        </div>
        )
    }
    asyncSubmit(){

        var answerStr = '';
        var sum = 0;
        for(let i=1;i<=10;i++){
            answerStr += $(this.refs.form).find('input[name=q'+i+']:checked').val() || '';
            sum += parseInt($(this.refs.form).find('input[name=q'+ i +']:checked').val())
        }
        if(answerStr.length<10){
            alert('请正确填写所有问题');
            return false;
        }

        if(sum<=13){
            this.setState({
                resultTxt:`本次问卷您的得分是：${sum}分。<br/>您属于保守型投资者，您的投资目标是寻求资本的保值，其次为资本的缓和升值，可承受的风险较低。适合投资类型：低风险投资。`
            })
        }else if(sum<=27){
            this.setState({
                resultTxt:`本次问卷您的得分是：${sum}分。<br/>您属于稳健型投资者，您的投资目标是寻求资本缓和升值，其次为资本保值。可承担中等风险。适合投资类型：中、低风险投资。`
            })
        }else{
            this.setState({
                resultTxt:`本次问卷您的得分是：${sum}分。<br/>您属于积极型投资者，您的投资目标是增值财富，您可承受一定风险，了解高收益总是与高风险相伴随。适合投资类型：高、中、低风险投资。`
            })
        }
        this.setState({
            overlayShouldShow:true
        })
        this.props.asyncRisk({
            answer:answerStr
        })
    }
}
