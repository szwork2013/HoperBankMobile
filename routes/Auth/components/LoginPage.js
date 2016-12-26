import React, { Component, PropTypes } from 'react'
import IconButton from 'components/IconButton'
import TextInput from 'components/TextInput'
import {Link} from 'react-router'
import {BaseButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
export default class LoginPage extends Component {
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
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    static propTypes = {
        doLogin: PropTypes.func
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
                //has backUrl ?  ---> backUrl
                //asset file ? ---> use location
                if(this.props.location.query.backUrl){
                    if(this.props.location.query.asset){
                        location.href=this.props.location.query.backUrl;
                    }else{
                        this.context.router.replace(this.props.location.query.backUrl)
                    }
                }else{
                    this.context.router.replace('/my')
                }
            }
        })
    }
    render() {
        return (
            <section className="form-wrap login-wrap">
                <RootLoading display={this.state.loading} />
                <div className={`auth-banner animated fadeIn`}>
                    <img src="/static/img/logo.png" width="50%" />
                </div>
                <section style={{width:'90%',margin:'0 auto'}}>
                    <TextInput
                        placeholder="请输入手机号码"
                        text="手机号码"
                        rule="^[1][3758][0-9]{9}$"
                        callback={(b,val)=>{this.setState({username:val,userNamePassed:b})}}>
                    </TextInput>
                    <TextInput
                        placeholder="请输入登录密码"
                        text="登录密码"
                        rule="^\w{6,16}$"
                        hasBorder={false}
                        type="password"
                        callback={(b,val)=>{this.setState({password:val,passWordPassed:b})}}>
                    </TextInput>
                    <section style={{width:'90%',textAlign:'right',margin:'10px auto',overflow:'hidden'}}>
                        <Link to="/forgot" className="fr" style={{color:'#666'}}>忘记密码?</Link>
                    </section>
                    <BaseButton text="登 录" className="mt20" onClick={this.login}/>
                    <BaseButton text="注 册" className="mt20 register" onClick={()=>{this.context.router.push('/register')}} />
                </section>

            </section>

        )
    }
}
