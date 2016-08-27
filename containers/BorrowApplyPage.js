import React, { Component, PropTypes } from 'react'
import {charge} from '../actions'
import {Field,reduxForm} from 'redux-form';
import {BaseButton,TextButton} from '../components/Button'
import RootLoading from '../components/RootLoading'
import showCity from '../static/lib/city'
const validate = values => {
    const errors = {}
    console.log(values.city)
    if (!values.name) {
        errors.name = '请输入姓名'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }
    if (!values.mobile) {
        errors.mobile = '请输入手机号'
    } else if (values.mobile.length > 15) {
        errors.mobile = 'Must be 15 characters or less'
    }

    //设置默认值
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

    if (!values.money) {
        errors.money = '请输入借款金额'
    } else if (values.money.length > 15) {
        errors.money = 'Must be 15 characters or less'
    }
    if (!values.cycle) {
        errors.cycle = '请输入借款期限'
    } else if (values.cycle.length > 15) {
        errors.cycle = 'Must be 15 characters or less'
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
            selectedCity:'',
            selectedSex:0
        }
        this.provinceChange = this.provinceChange.bind(this);
        this.cityChange = this.cityChange.bind(this);
        this.sexChange = this.sexChange.bind(this)
    }
    componentWillMount() {
    }
    check(data){
        console.log(data)
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
            <section className="level-2-wrap">
                <form onSubmit={handleSubmit(this.check)}>
                    <div className="borrow-apply-wrap">
                        <Field name="name" component={renderField} type="text" placeholder="请输入姓名" label="姓名"/>
                        <div className="borrow-apply-item">
                            <label >称谓</label>
                            <Field name="sex" value="0" component="select" >
                                <option value="0">先生</option>
                                <option value="1">女士</option>
                            </Field>
                        </div>
                        <Field name="mobile" component={renderField} type="text" label="联系电话"/>
                        <div className="borrow-apply-item">
                            <label >所在城市</label>
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
                            <Field name="province" props={{onChange:this.provinceChange}}  component="select" >
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
                            </Field>

                        </div>
                        <div className="borrow-apply-item">
                            <label >借款人类型</label>
                            <Field name="typeId" component="select">
                                <option value="0">个人</option>
                                <option value="1">企业</option>
                            </Field>
                        </div>
                        <Field name="money" component={renderField} type="text" label="借款金额" unit="万元"/>
                        <Field name="cycle" component={renderField} type="text" label="借款期限" unit="个月"/>
                    </div>
                    <button className={`base-button ${(invalid || submitting)?'disabled':''}`} type="submit" disabled={invalid || submitting} >提交申请</button>
                </form>

            </section>
        )
    }
}
/*BorrowApplyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};*/
BorrowApplyPage.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: 'contact',
    validate
})(BorrowApplyPage);

