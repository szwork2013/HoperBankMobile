import React, { Component, PropTypes } from 'react'
import {Field,reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import {BaseButton,TextButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
import Overlay from 'components/Overlay'
import showCity from './city'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'
const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = '请输入姓名'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }
    if (!values.mobile) {
        errors.mobile = '请输入手机号'
    } else if (!/^[1][3758][0-9]{9}$/i.test(values.mobile)) {
        errors.mobile = '请输入正确的手机号码'
    }

    //设置默认值-性别-省份-城市
    if (!values.sex) {
        values.sex=0
    }
    if (!values.province) {
        values.province = '北京'
    }
    if (!values.city) {
        values.city = '北京'
    }
    if (!values.typeId) {
        values.typeId = 0
    }

    if (!values.company) {
        errors.money = '请输入工作单位'
    }
    if (!values.money) {
        errors.money = '请输入借款金额'
    } else if (!Number(values.money)) {
        errors.money = '请输入正确的金额'
    }
    if (!values.cycle) {
        errors.cycle = '请输入借款期限'
    } else if (!Number(values.cycle)){
        errors.cycle = '请输入正确的借款期限'
    }
    return errors
}
const asyncValidate = (values/*, dispatch */) => {
    return sleep(1000) // simulate server latency
        .then(() => {
            if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
                throw { username: 'That username is taken' }
            }
        })
}

const renderField = ({ input, label,unit, type, meta: { touched, error } }) => (
    <div className="borrow-apply-item">
        <label>{label}</label>
        {unit && <span>{unit}</span>}
        <input {...input} placeholder={label} type={type}/>
        {touched && error && <div className="error">{error}</div>}
    </div>
)
class BorrowApplyPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            province:'北京',
            city:[],
            loading:false,
            overlayShouldShow:false
        }
        this.provinceChange = this.provinceChange.bind(this);
        this.cityChange = this.cityChange.bind(this);
        this.sexChange = this.sexChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
    }
    submit(data){
        console.log(data)
        this.setState({
            loading:true
        });
        this.props.applyAction({
            referrerName:data.name,
            sex:data.sex,
            phone:data.mobile,
            province:data.province,
            city:data.city,
            company:data.company,
            money:data.money,
            cycle:data.cycle,
            callback:(result)=>{
                this.setState({
                    loading:false
                });
                if(result.r==1){
                    setTimeout(()=>{
                        alert('申请成功，我们将会在三个工作日内联系您。');
                        browserHistory.goBack()
                    },300)
                }
            }
        })
        return false;
    }
    provinceChange(ev){
        this.setState({
            province:ev.target.value,
            city:showCity(ev.target.value)
        })
    }
    cityChange(ev){
        this.setState({
            selectedCity:ev.target.value
        })
    }
    sexChange(ev){
        this.setState({
            selectedSex:ev.target.value
        })
    }
    render(){
        const {handleSubmit,invalid, reset, submitting} = this.props;
        return(

            <section className="level-2-wrap" style={{backgroundColor:'#fff'}}>
                    <Overlay display={this.state.overlayShouldShow}>
                        <p style={{width:'90%',margin:'30% auto 0 auto',color:'#fff',position:'relative',zIndex:1000}}>“定制”是琥珀金服为满足因银行授信政策、额度、放款效率等情况限制而急需借款的个人和中小微企业所推出的借款项目；</p>
                        <p style={{width:'90%',margin:'15px auto 0 auto',color:'#fff',position:'relative',zIndex:1000}}>
                            *琥珀金服承诺您所提供的信息仅用于联系您本人所用，并严格保密。
                        </p>
                        <div className="close" onClick={()=>this.setState({overlayShouldShow:false})}></div>
                    </Overlay>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <div className="borrow-apply-wrap">
                            <Field name="name" component={renderField} type="text" placeholder="请输入姓名" label="姓名"/>
                            <div className="borrow-apply-item">
                                <label >称谓</label>
                                <Field name="sex" value="0" component="select" >
                                    <option value="0">先生</option>
                                    <option value="1">女士</option>
                                </Field>
                            </div>
                            <Field name="mobile" component={renderField} type="text" label="联系电话"  />
                            <div className="borrow-apply-item">
                                <label >所在城市</label>
                                <select onChange={this.provinceChange}>
                                    <option value="北京">北京</option>
                                    <option value="上海">上海</option>
                                    <option value="广东">广东</option>
                                    <option value="江苏">江苏</option>
                                    <option value="浙江">浙江</option>
                                    <option value="重庆">重庆</option>
                                    <option value="安徽">安徽</option>
                                    <option value="福建">福建</option>
                                    <option value="甘肃">甘肃</option>
                                    <option value="广西">广西</option>
                                    <option value="贵州">贵州</option>
                                    <option value="海南">海南</option>
                                    <option value="河北">河北</option>
                                    <option value="黑龙江">黑龙江</option>
                                    <option value="河南">河南</option>
                                    <option value="湖北">湖北</option>
                                    <option value="湖南">湖南</option>
                                    <option value="江西">江西</option>
                                    <option value="吉林">吉林</option>
                                    <option value="辽宁">辽宁</option>
                                    <option value="内蒙古">内蒙古</option>
                                    <option value="宁夏">宁夏</option>
                                    <option value="青海">青海</option>
                                    <option value="山东">山东</option>
                                    <option value="山西">山西</option>
                                    <option value="陕西">陕西</option>
                                    <option value="四川">四川</option>
                                    <option value="天津">天津</option>
                                    <option value="新疆">新疆</option>
                                    <option value="西藏">西藏</option>
                                    <option value="云南">云南</option>
                                    <option value="香港">香港特别行政区</option>
                                    <option value="澳门">澳门特别行政区</option>
                                    <option value="台湾">台湾</option>
                                    <option value="海外">海外</option>
                                </select>
                                <Field name="city" component="select">
                                    {this.state.city.length===0 && <option value='北京'>北京</option>}
                                    {
                                        this.state.city.map((item,index)=>{
                                            return(
                                                <option value={item} key={index}>{item}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </div>
                            <Field name="company" component={renderField} type="text" label="工作单位" />
                            <div className="borrow-apply-item">
                                <label >借款人类型</label>
                                <Field name="typeId" component="select">
                                    <option value="0">个人</option>
                                    <option value="1">企业</option>
                                </Field>
                            </div>
                            <Field name="money" component={renderField} type="text" label="借款金额" unit="万元"/>
                            <Field name="cycle" component={renderField} type="text" label="借款期限" unit="个月"/>

                            <p style={{margin:'20px auto 20px auto'}} onClick={()=>this.setState({overlayShouldShow:true})}>申请说明</p>
                            <button className={`base-button ${(invalid || submitting)?'disabled':''}`} style={{width:'100%'}} type="submit" disabled={invalid || submitting} >提交申请</button>
                        </div>

                    </form>
                <RootLoading display={this.state.loading} />



            </section>
        )
    }
}
BorrowApplyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};
BorrowApplyPage.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: 'contact',
    validate
})(BorrowApplyPage);

