import React, { Component, PropTypes } from 'react'
import IconButton from 'components/IconButton'
import TextInput from 'components/TextInput'
import {BaseButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
import { browserHistory,Link } from 'react-router'
export default class ResetPassWordPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            prevPassword:'',
            prevPasswordPassed:false,
            newPassword:'',
            newPasswordPassed:false,
            reNewPassword:'',
            reNewPasswordPassed:false,
            loading:false
        }
        this.doReset = this.doReset.bind(this);
    }
    componentWillMount() {
        !this.props.userId && browserHistory.replace('/login')
    }
    doReset(){
        const props = this.props;
        if(!this.state.prevPasswordPassed){
            alert('请输入6位以上原密码');
            return false;
        }
        if(!this.state.newPasswordPassed){
            alert('请输入六位以上新密码');
            return false;
        }
        if(!this.state.reNewPasswordPassed){
            alert('请再次输入六位以上新密码');
            return false;
        }
        if(this.state.reNewPassword != this.state.newPassword){
            alert('两次密码输入不一致');
            return false;
        }
        this.setState({
            loading:true
        })

        //0是修改登录密码
        props.resetPassWord({
            userId:props.userId,
            type:0,
            oldpasswd:hex_md5(this.state.prevPassword),
            newpasswd:hex_md5(this.state.newPassword),
            callback:(result)=>{
                this.setState({
                    loading:false
                })
                setTimeout(()=>{
                    if(result.r==1){
                        alert('修改成功，请牢记您的新密码!');
                        props.doLogout();
                        browserHistory.replace('/login');
                    }else{
                        alert(result.msg);
                    }
                },300)
            }
        })
    }
    render() {
        return (
            <section className="level-2-wrap">
                <section className="form-wrap register-wrap" >
                    <RootLoading display={this.state.loading} />
                    <TextInput
                        placeholder="请输入原密码"
                        text="原密码"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({prevPassword:val,prevPasswordPassed:b})}}>
                    </TextInput>
                    <TextInput
                        placeholder="请输入新密码"
                        text="新密码"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({newPassword:val,newPasswordPassed:b})}}>
                    </TextInput>
                    <TextInput
                        placeholder="请再次输入新密码"
                        text="确认密码"
                        rule="^\w{6,16}$"
                        type="password"
                        callback={(b,val)=>{this.setState({reNewPassword:val,reNewPasswordPassed:b})}}>
                    </TextInput>
                    <section style={{width:'90%',textAlign:'right',margin:'10px auto',overflow:'hidden'}}>
                        <Link to="/forgot" className="fr" >忘记密码?</Link>
                    </section>
                    <BaseButton text="确定" className="mt20" onClick={this.doReset}/>
                </section>
            </section>


        )
    }
}
ResetPassWordPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
