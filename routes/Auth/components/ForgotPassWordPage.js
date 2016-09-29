import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { forgotPassWordStep3,forgotPassWordStep2,forgotPassWordStep1 } from 'actions'
import IconButton from 'components/IconButton'
import IconInput from 'components/IconInput'
import {BaseButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
import { Link,browserHistory } from 'react-router'
var timer1 = null,
    timer2 = null;
class ForgotPassWordPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:'',
            newPassword:'',
            reNewPassword:'',
            yCode:'',
            resCode:'',
            times:3,
            userNamePassed:false,
            newPasswordPassed:false,
            reNewPasswordPassed:false,
            yCodePassed:false,
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
    }
    sendYcode(mobile,callback){
        this.props.forgotPassWordStep1({
            mobile:mobile,
            callback:(result)=>{
                callback && callback(result);
            }
        })
    }
    doStepFirst(){
        const props = this.props;
        this.setState({
            loading:true,
        })
        props.forgotPassWordStep2({
            mobile:this.state.username,
            smsCode:this.state.yCode,
            callback:(result)=>{
                if(result.r==1){
                    clearInterval(timer1)
                    this.setState({
                        step:{
                            first:false,
                            second:true,
                            third:false
                        },
                        resCode:result.resCode
                    })
                }else{
                    alert(result.msg);
                }
                this.setState({
                    loading:false
                })
            }
        })
    }
    doStepSecond(){
        if(!this.state.newPasswordPassed){
            alert('请输入6位以上字母加数字密码');
            return false;
        }
        if(!this.state.reNewPasswordPassed){
            alert('请再次输入6位以上字母加数字密码');
            return false;
        }
        if(this.state.newPassword != this.state.reNewPassword){
            alert('两次密码输入不一致');
            return false;
        }
        this.setState({
            loading:true
        })
        this.props.forgotPassWordStep3({
            mobile:this.state.username,
            passwd:hex_md5(this.state.newPassword),
            resCode:this.state.resCode,
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
                    this.doStepThird();
                }else{
                    alert(result.msg)
                }
            }
        })
    }
    doStepThird(){
        timer2 = setInterval(()=>{
            if(this.state.times ===0){
                clearInterval(timer2)
                browserHistory.replace('/login');
                return false;
            }
            this.setState({
                times:--this.state.times
            })
            console.log(2)
        },1000)
    }
    handleGetCode(){
        if(!this.state.userNamePassed){
            alert('请输入正确的手机号码');
            return false;
        }
        this.setState({
            yCodeSendAble:false
        });
        var time = 120;
        this.refs.yCode.innerHTML='正在发送';
        this.sendYcode(this.state.username,(result)=>{
            if(result.r==1){
                timer1=setInterval(()=>{
                    console.log(1)
                    if(time==0){
                        clearInterval(timer1);
                        this.setState({
                            yCodeSendAble:true
                        })
                        this.refs.yCode.innerHTML=`重新获取`;
                        return false;
                    }
                    this.refs.yCode.innerHTML=`${time--}秒`;
                },1000)
            }else{
                alert(result.msg);
                this.refs.yCode.innerHTML='重新获取';
                this.setState({
                    yCodeSendAble:true
                })
            }
        })
    }
    render() {
        return (
            <section className="form-wrap" style={{paddingTop:'30px'}}>
                <RootLoading display={this.state.loading} />
                <section className={`register-step-first ${this.state.step.first ? '':'hide'}`} >
                    <IconInput
                        placeholder="请输入手机号"
                        icon="icon-tel"
                        rule="^[1][3758][0-9]{9}$"
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                        <button ref="yCode" className={`input-btn get-code ${this.state.yCodeSendAble?'':'disabled'}`} disabled={!this.state.yCodeSendAble}  onClick={this.handleGetCode} >获取验证码</button>
                    </IconInput>
                    <IconInput
                        placeholder="请输入验证码"
                        icon="icon-ycode"
                        rule="^[0-9]{6}$"
                        hasBorder={false}
                        callback={(b,val)=>{this.setState({yCode:val,yCodePassed:b})}}>
                    </IconInput>
                    <BaseButton text="下一步" onClick={this.doStepFirst} className={`mt20 ${ (this.state.userNamePassed && this.state.yCodePassed)? '':'disabled'}`} disabled={!(this.state.userNamePassed && this.state.yCodePassed)} />
                </section>
                <section className={`register-step-second ${this.state.step.second ? '':'hide'}`}>
                    <IconInput
                        placeholder="请输入新密码"
                        rule="^\w{6,16}$"
                        contentClass='no-icon'
                        type="password"
                        callback={(b,val)=>{this.setState({newPassword:val,newPasswordPassed:b})}}>
                    </IconInput>
                    <IconInput
                        placeholder="请再次输入新密码"
                        rule="^\w{6,16}$"
                        hasBorder={false}
                        contentClass='no-icon'
                        type="password"
                        callback={(b,val)=>{this.setState({reNewPassword:val,reNewPasswordPassed:b})}}>
                    </IconInput>
                    <BaseButton text="下一步" onClick={this.doStepSecond} className="mt20" />
                </section>
                <section className={`register-step-third ${this.state.step.third ? '':'hide'}`} >
                    <img src="/static/img/ok.png" width="80" />
                    <section className="tip-section-2">
                        您的登录密码已修改成功
                    </section>
                    <BaseButton text={`${this.state.times}秒后返回登录界面`} className="mt20" onClick={()=>{clearInterval(timer1);clearInterval(timer2);browserHistory.replace('/login')}} />
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
    forgotPassWordStep3,
    forgotPassWordStep2,
    forgotPassWordStep1,
})(ForgotPassWordPage)
