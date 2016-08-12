import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { doLogin } from '../actions'
import IconButton from '../components/IconButton'
import IconInput from '../components/IconInput'
import {BaseButton} from '../components/Button'
import RootLoading from '../components/RootLoading'
class ReigsterPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:'',
            password:'',
            userNamePassed:false,
            passWordPassed:false,
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
    }
    componentWillMount() {
        //已登陆过就直接跳到我的
        this.props.account.userId && this.context.router.push('/my')
    }
    componentDidMount(){

    }
    doStepFirst(){
        this.setState({
            step:{
                first:false,
                second:true,
                third:false
            }
        })
    }
    doStepSecond(){
        this.setState({
            step:{
                first:false,
                second:false,
                third:true
            }
        })
    }
    doStepThird(){

    }
    render() {
        return (
            <section className="form-wrap">
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
                        注册即同意<a>《琥珀金服服务协议》</a>
                    </section>
                    <BaseButton text="下一步" onClick={this.doStepFirst} className="mt20" />
                    <section className="tip-section-2">
                        <a>已有帐号返回登录</a>
                    </section>
                </section>
                <section className={`register-step-second ${this.state.step.second ? '':'hide'}`}>
                    <section className="tip-section-2">
                        已向150000000手机发送验证码,请查收短信
                    </section>
                    <IconInput
                        placeholder="请输入验证码"
                        icon="icon-ycode"
                        rule="^[1][3758][0-9]{9}$"
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                    </IconInput>
                    <IconInput
                        placeholder="请输入密码"
                        icon="icon-pwd"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({password:val,passWordPassed:b})}}>
                    </IconInput>
                    <IconInput
                        placeholder="请再次输入密码"
                        icon="icon-pwd"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({password:val,passWordPassed:b})}}>
                    </IconInput>
                    <IconInput
                        placeholder="推荐人手机号"
                        icon=""
                        rule="^\w{6,16}$"
                        hasBorder={false}
                        type="text"
                        callback={(b,val)=>{this.setState({password:val,passWordPassed:b})}}>
                    </IconInput>
                    <section className="tip-section-2">
                        没有推荐人请填写：hoperbank
                    </section>
                    <BaseButton text="下一步" onClick={this.doStepSecond} className="mt20" />
                </section>
                <section className={`register-step-third ${this.state.step.third ? '':'hide'}`} >
                    <img src="/static/img/ok.png" width="80" />
                    <section className="tip-section-2">
                        注册成功！
                    </section>
                    <BaseButton text="完成注册" className="mt20" />
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
    doLogin
})(ReigsterPage)
