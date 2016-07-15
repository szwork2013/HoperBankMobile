import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { doLogin } from '../actions'
import IconButton from '../components/IconButton'
import IconInput from '../components/IconInput'
import {BaseButton} from '../components/Button'
import RootLoading from '../components/RootLoading'
class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:'',
            password:'',
            userNamePassed:false,
            passWordPassed:false,
            loading:false
        }
        this.login = this.login.bind(this);
    }
    componentWillMount() {
        //已登陆过就直接跳到我的
        this.props.account.userId && this.context.router.push('/my')
    }
    componentDidMount(){

    }
    login(){
        if(!this.state.userNamePassed){
            alert('请输入十一位手机号码');
            return false;
        }
        if(!this.state.passWordPassed){
            alert('请输入六位以上密码');
            return false;
        }
        this.setState({
            loading:true
        })
        this.props.doLogin(this.state.username,hex_md5(this.state.password),(result)=>{
            if(result.r!=1){
                this.setState({
                    loading:false
                })
                setTimeout(()=>{
                    alert(result.msg)
                },300)
            }else{
                this.context.router.push('/my')
            }
        })
    }
    render() {
        return (
            <section className="form-wrap" style={{marginTop:'30px'}}>
                <RootLoading display={this.state.loading} />
                <IconInput
                    placeholder="请输入手机号"
                    icon="icon-phone"
                    rule="^[1][3758][0-9]{9}$"
                    callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                </IconInput>
                <IconInput
                    placeholder="请输入密码"
                    icon="icon-pwd"
                    rule="^\w{6,16}$"
                    hasBorder={false}
                    type="password"
                    callback={(b,val)=>{this.setState({password:val,passWordPassed:b})}}>
                </IconInput>
                <section style={{width:'90%',textAlign:'right',margin:'10px auto'}}>
                    <a href="findoutPwd.html" className="fr" style={{color:'#004fa3'}}>忘记密码?</a>
                </section>
                <BaseButton text="登 录" className="mt20" onClick={this.login}/>
                <BaseButton text="注 册" className="mt20 register" />
            </section>

        )
    }
}
LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        account:state.account
    }
}

export default connect(mapStateToProps, {
    doLogin
})(LoginPage)
