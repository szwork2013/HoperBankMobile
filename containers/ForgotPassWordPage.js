import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { doLogin,registerFirstStep,registerSecondStep,registerThirdStep } from '../actions'
import IconButton from '../components/IconButton'
import IconInput from '../components/IconInput'
import {BaseButton} from '../components/Button'
import RootLoading from '../components/RootLoading'
import { Link } from 'react-router'
class ForgotPassWordPage extends Component {
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
    }
    componentWillMount() {
        //已登陆过就直接跳到我的
    }
    componentDidMount(){

    }
    testPassword(){
        this.setState({
            bothPasswordPassed:this.state.rePassword == this.state.password
        })
    }
    sendYcode(mobile,callback){
        this.props.registerSecondStep(mobile,(result)=>{
            callback && callback(result);
        })
    }
    doStepFirst(){
        const props = this.props;
    }
    doStepSecond(){
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
    }
    setErrorTip(obj){
        for(var item of obj){
            if(!item.condition){
                alert(item.errorMsg);
                return false;
            }
        }
    }
    doStepThird(){
    }
    handleGetCode(){
        if(!this.state.userNamePassed){
            return false;
        }
        this.setState({
            yCodeSendAble:false
        })
        var timer = null;
        var time = 120;
        this.refs.yCode.value='正在发送';
        this.sendYcode(this.state.username,(result)=>{
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
    render() {
        return (
            <section className="form-wrap" style={{marginTop:'30px'}}>
                <RootLoading display={this.state.loading} />
                <section className={`register-step-first ${this.state.step.first ? '':'hide'}`} >
                    <IconInput
                        placeholder="请输入手机号"
                        icon="icon-tel"
                        rule="^[1][3758][0-9]{9}$"
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                        <input type="button" ref="yCode" className={`input-btn get-code ${this.state.yCodeSendAble?'':'disabled'}`} disabled={!this.state.yCodeSendAble} value="获取验证码" onClick={this.handleGetCode} />
                    </IconInput>
                    <IconInput
                        placeholder="请输入验证码"
                        icon="icon-ycode"
                        rule="^[0-9]{6}$"
                        hasBorder={false}
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                    </IconInput>
                    <BaseButton text="下一步" onClick={this.doStepFirst} className={`mt20 ${this.state.userNamePassed? '':'disabled'}`} disabled={!this.state.userNamePassed} />
                </section>
                <section className={`register-step-second ${this.state.step.second ? '':'hide'}`}>
                    <IconInput
                        placeholder="请输入密码"
                        icon="icon-pwd"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({password:val,passWordPassed:b,bothPasswordPassed:this.state.rePassword === val})}}>
                    </IconInput>
                    <IconInput
                        placeholder="请再次输入密码"
                        icon="icon-pwd"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({rePassword:val,rePasswordPassed:b,bothPasswordPassed:this.state.password === val})}}>
                    </IconInput>
                    <BaseButton text="注册" onClick={this.doStepSecond} className="mt20" />
                </section>
                <section className={`register-step-third ${this.state.step.third ? '':'hide'}`} >
                    <img src="/static/img/ok.png" width="80" />
                    <section className="tip-section-2">
                        注册成功！
                    </section>
                    <BaseButton text="完成注册" className="mt20" onClick={this.doStepThird} />
                </section>
            </section>

        )
    }
}
ForgotPassWordPage.contextTypes = {
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
})(ForgotPassWordPage)
