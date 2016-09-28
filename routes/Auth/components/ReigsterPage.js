import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { doLogin,registerFirstStep,registerSecondStep,registerThirdStep } from 'actions'
import IconButton from 'components/IconButton'
import IconInput from 'components/IconInput'
import {BaseButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
import { Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
    sendYcode(mobile,callback){
        this.props.registerSecondStep(mobile,(result)=>{
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

        console.log(`usernamepassed:${this.state.userNamePassed}`)
        console.log(`passwordpassed:${this.state.passWordPassed}`)
        console.log(`repasswordpassed:${this.state.rePasswordPassed}`)
        console.log(`both:${this.state.bothPasswordPassed}`)
        console.log(`yCodePassed:${this.state.yCodePassed}`)
        console.log(`referrerNamePassed:${this.state.referrerNamePassed}`)

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
                this.doRegister();
            }else{
                //推荐人填写的是手机号的时候
                this.props.registerFirstStep(this.state.referrerName,(result)=>{
                    if(result.r==1002){
                        this.doRegister();
                    }else{
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
            this.context.router.push('/my')
        })
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
            <section className="form-wrap">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <RootLoading display={this.state.loading} />
                <section className={`register-step-first ${this.state.step.first ? '':'hide'}`} >
                    <img src="/static/img/login_banner.jpg" width="100%" style={{marginBottom:'10px'}} />
                    <IconInput
                        placeholder="请输入手机号"
                        icon="icon-tel"
                        rule="^[1][3758][0-9]{9}$"
                        hasBorder={false}
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                    </IconInput>
                    <section className="tip-section-2">
                        注册即同意<Link to="/register/agreement">《琥珀金服服务协议》</Link>
                    </section>
                    <BaseButton text="下一步" onClick={this.doStepFirst} className={`mt20 ${this.state.userNamePassed? '':'disabled'}`} disabled={!this.state.userNamePassed} />
                    <section className="tip-section-2">
                        <Link to="/login">已有帐号返回登录</Link>
                    </section>
                </section>
                <section className={`register-step-second ${this.state.step.second ? '':'hide'}`}>
                    <section className="tip-section-2">
                        已向{this.state.username}手机发送验证码,请查收短信
                    </section>
                    <IconInput
                        placeholder="请输入验证码"
                        icon="icon-ycode"
                        rule="^[0-9]{6}$"
                        callback={(b,val)=>{this.setState({yCode:val,yCodePassed:b})}}>
                        <input type="button" ref="yCode" className={`input-btn get-code ${this.state.yCodeSendAble?'':'disabled'}`} disabled={!this.state.yCodeSendAble} value="重新获取" onClick={this.handleGetCode} />
                    </IconInput>

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
                    <IconInput
                        placeholder="推荐人手机号"
                        icon=""
                        rule="^([1][3758][0-9]{9}|hoperbank)$"
                        hasBorder={false}
                        type="text"
                        defaultValue={this.props.location.query.referrerName || ''}
                        callback={(b,val)=>{this.setState({referrerName:val,referrerNamePassed:b})}}>
                    </IconInput>
                    <section className="tip-section-2">
                        没有推荐人请填写：hoperbank
                    </section>
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
