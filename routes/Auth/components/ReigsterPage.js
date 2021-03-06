import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { doLogin,registerFirstStep,registerSecondStep,registerThirdStep } from 'actions'
import IconButton from 'components/IconButton'
import IconInput from 'components/IconInput'
import TextInput from 'components/TextInput'
import {BaseButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
import { Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var timer = null;
class ReigsterPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:'',
            password:'',
            rePassword:'',
            yCode:'',
            referrerName:'',
            userNamePassed:false,
            passWordPassed:false,
            rePasswordPassed:false,
            bothPasswordPassed:false,
            yCodePassed:false,
            referrerNamePassed:false,
            yCodeSendAble:true,
            loading:false,
            step:{
                first:true,
                second:false,
                third:false
            }
        }
        this.doStepFirst = this.doStepFirst.bind(this);
        this.doStepSecond = this.doStepSecond.bind(this);
        this.doStepThird = this.doStepThird.bind(this);
        this.handleGetCode = this.handleGetCode.bind(this);
        this.testPassword = this.testPassword.bind(this);
        this.getVoiceCodeHandle=this.getVoiceCodeHandle.bind(this);
    }
    componentWillMount() {
        //已登陆过就直接跳到我的
        this.props.account.userId && this.context.router.push('/my')
    }
    componentDidMount(){

    }
    testPassword(){
        this.setState({
            bothPasswordPassed:this.state.rePassword == this.state.password
        })
    }
    sendYcode(mobile,type,callback){
        this.props.registerSecondStep(mobile,type,(result)=>{
            callback && callback(result);
        })
    }
    doStepFirst(){
        const props = this.props;
        if(this.state.userNamePassed){
            //手机号码格式通过
            this.setState({
                loading:true
            })
            props.registerFirstStep(this.state.username,(result)=>{
                if(result.r==1){
                    this.setState({
                        step:{
                            first:false,
                            second:true,
                            third:false
                        }
                    })
                    this.handleGetCode()
                }else{
                    setTimeout(()=>{
                        alert(result.msg)
                    },300)

                }
                this.setState({
                    loading:false
                })
            })
        }
    }
    doStepSecond(){

        /*console.log(`usernamepassed:${this.state.userNamePassed}`)
        console.log(`passwordpassed:${this.state.passWordPassed}`)
        console.log(`repasswordpassed:${this.state.rePasswordPassed}`)
        console.log(`both:${this.state.bothPasswordPassed}`)
        console.log(`yCodePassed:${this.state.yCodePassed}`)
        console.log(`referrerNamePassed:${this.state.referrerNamePassed}`)*/
        if(this.props.location.query.referrerName){
            this.state.referrerNamePassed=true;
            this.state.referrerName=this.props.location.query.referrerName;
            this.setState({
                referrerNamePassed:true,
                referrerName:this.props.location.query.referrerName
            })
        }
        this.setErrorTip([
            {
                condition:this.state.userNamePassed,
                errorMsg:'请输入正确的用户名'
            },
            {
                condition:this.state.passWordPassed,
                errorMsg:'请输入6-20位密码'
            },
            {
                condition:this.state.rePasswordPassed,
                errorMsg:'请再次输入6-20位密码'
            },
            {
                condition:this.state.bothPasswordPassed,
                errorMsg:'两次密码不一致'
            },
            {
                condition:this.state.yCodePassed,
                errorMsg:'请输入6位数字验证码'
            },
            {
                condition:this.state.referrerNamePassed,
                errorMsg:'请输入正确的推荐人'
            }
        ])
        if(this.state.userNamePassed && this.state.passWordPassed && this.state.rePasswordPassed && this.state.bothPasswordPassed && this.state.yCodePassed  && this.state.referrerNamePassed){
            this.setState({
                loading:true
            })
            if(this.state.referrerName.toLowerCase()=='hoperbank'){
                //填的不是手机号的时候
                clearInterval(timer)
                this.doRegister();
            }else{
                //推荐人填写的是手机号的时候
                this.props.registerFirstStep(this.state.referrerName,(result)=>{
                    if(result.r==1002){
                        clearInterval(timer)
                        this.doRegister();
                    }else{
                        this.setState({
                            loading:false
                        })
                        alert('没有该推荐人')
                    }
                })
            }
        }

    }
    setErrorTip(obj){
        for(var item of obj){
            if(!item.condition){
                alert(item.errorMsg);
                return false;
            }
        }
    }
    doRegister(){
        if(!this.refs.agree.checked){
            alert('请阅读并同意注册相关条款')
            return false;
        }
        this.props.registerThirdStep({
            mobile:this.state.username,
            password:hex_md5(this.state.password),
            code:this.state.yCode,
            referrerName:this.state.referrerName,
            callback:(result)=>{
                this.setState({
                    loading:false
                })
                if(result.r==1){
                    this.setState({
                        step:{
                            first:false,
                            second:false,
                            third:true
                        }
                    })
                }else{
                    alert(result.msg)
                }
            }

        })
    }
    doStepThird(){
        this.props.doLogin(this.state.username,hex_md5(this.state.password),()=>{
            if(this.props.location.query.backUrl){
                if(this.props.location.query.asset){
                    location.href=this.props.location.query.backUrl;
                }else{
                    this.context.router.replace(this.props.location.query.backUrl)
                }
            }else{
                this.context.router.push('/my')
            }
        })
    }
    handleGetCode(){
        if(!this.state.userNamePassed){
            return false;
        }
        this.setState({
            yCodeSendAble:false
        })
        var time = 120;
        this.refs.yCode.value='正在发送';
        this.sendYcode(this.state.username,1,(result)=>{
            if(result.r==1){
                timer=setInterval(()=>{
                    this.refs.yCode.value=`${time--}秒`;
                    if(time==0){
                        clearInterval(timer);
                        this.setState({
                            yCodeSendAble:true
                        })
                        this.refs.yCode.value=`重新获取`;
                    }
                },1000)
            }else{
                this.refs.yCode.value='重新获取';
                this.setState({
                    yCodeSendAble:true
                })
            }
        })
    }
    getVoiceCodeHandle(){
        this.sendYcode(this.state.username,2,(result)=>{
            alert(result.msg)
        })
    }
    render() {
        return (
            <section className="form-wrap register-wrap">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <RootLoading display={this.state.loading} />
                <section className={`register-step-first ${this.state.step.first ? '':'hide'}`} >
                    <TextInput
                        placeholder="请输入手机号"
                        rule="^[1][3758][0-9]{9}$"
                        hasBorder={false}
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                    </TextInput>
                    <BaseButton text="下一步" onClick={this.doStepFirst} className={`mt20 ${this.state.userNamePassed? '':'disabled'}`} disabled={!this.state.userNamePassed} />
                    <section className="tip-section-2">
                        <Link to="/login">已有帐号返回登录</Link>
                    </section>
                </section>
                <section className={`register-step-second ${this.state.step.second ? '':'hide'}`}>
                    <TextInput
                        placeholder="请输入验证码"
                        text="输入验证码"
                        rule="^[0-9]{6}$"
                        callback={(b,val)=>{this.setState({yCode:val,yCodePassed:b})}}>
                        <input type="button" ref="yCode" className={`input-btn get-code ${this.state.yCodeSendAble?'':'disabled'}`} disabled={!this.state.yCodeSendAble} value="重新获取" onClick={this.handleGetCode} />
                    </TextInput>

                    <TextInput
                        placeholder="请输入密码"
                        text="输入密码"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({password:val,passWordPassed:b,bothPasswordPassed:this.state.rePassword === val})}}>
                    </TextInput>
                    <TextInput
                        placeholder="请再输入密码"
                        text="确认密码"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({rePassword:val,rePasswordPassed:b,bothPasswordPassed:this.state.password === val})}}>
                    </TextInput>
                    <TextInput
                        placeholder="请输入推荐人手机号"
                        text="推荐人手机号"
                        rule="^([1][3758][0-9]{9}|hoperbank)$"
                        type="text"
                        defaultValue={this.props.location.query.referrerName || ''}
                        callback={(b,val)=>{this.setState({referrerName:val,referrerNamePassed:b})}}>
                    </TextInput>
                    <section className="tip-section-2">
                        没有推荐人请填写：hoperbank
                    </section>
                    <section className="tip-section-2">
                        <label>
                            <input type="checkbox" ref="agree"  style={{marginRight:'5px'}} defaultChecked="checked" />
                            我已阅读并同意<Link to="/register/agreement" style={{color:'#ee5447'}}>《琥珀金服服务协议》</Link>及<Link to="/risktest" style={{color:'#ee5447'}}>《风险评测》</Link>
                        </label>
                    </section>
                    <BaseButton text="完成" onClick={this.doStepSecond} className="mt20" />

                    <p className="voice-p">收不到验证码?试试<span onClick={this.getVoiceCodeHandle}>语音验证</span></p>
               </section>
                <section className={`register-step-third ${this.state.step.third ? '':'hide'}`} >
                    <img src="/static/img/login_ok_picture.png" width="80" />
                    <section className="tip-section-2">
                        恭喜您,注册成功！
                    </section>
                    <BaseButton text="立即使用" className="mt20" onClick={this.doStepThird} />
                </section>
            </section>

        )
    }
}
ReigsterPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        account:state.account
    }
}

export default connect(mapStateToProps, {
    doLogin,
    registerFirstStep,
    registerSecondStep,
    registerThirdStep
})(ReigsterPage)
