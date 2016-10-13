import React, { Component, PropTypes } from 'react'
import {BaseButton,TextButton} from 'components/Button'
import IconInput from 'components/IconInput'
import RootLoading from 'components/RootLoading'
import { browserHistory } from 'react-router'
export default class BindBankPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            name:'',
            namePassed:false,
            idCard:'',
            idCardPassed:false,
            firstStepPassed:false,
            firstStepText:'下一步',
            activeStep:1,
            cityData:[],
            bankId:'',
            bankNo:'',
            bankNoPassed:false,
            province:'',
            city:'',
            loading:false
        }
        this.checkStep1 = this.checkStep1.bind(this);
    }
    checkStep1(){
        setTimeout(()=>{
            if(this.state.namePassed && this.state.idCardPassed){
                this.setState({
                    firstStepPassed:true
                })
            }else{
                this.setState({
                    firstStepPassed:false
                })
            }
        },200)

    }
    fetchCity(province){
        this.props.fetchCity(province,(result)=>{
            if(result.r==1){
                this.setState({
                    cityData:result.list
                })
            }
        })
    }
    doStep1(){
        const props = this.props;
        if(this.state.firstStepPassed){
            this.setState({
                firstStepPassed:false,
                firstStepText:'请稍后……'
            })
            props.asyncCheckId({
                userId:props.userId,
                name:this.state.name,
                pid:this.state.idCard,
                callback:(result)=>{
                    if(result.r==1){
                        //身份证验证通过
                        this.setState({
                            activeStep:2
                        })
                    }else{
                        alert(result.msg)
                    }
                    this.setState({
                        firstStepPassed:true,
                        firstStepText:'下一步'
                    })
                }
            })
        }
    }
    doStep2(){
        const props = this.props;
        if(!this.state.province){
            alert('请选择省份');
            return false;
        }
        if(!this.state.city){
            alert('请选择城市');
            return false;
        }
        if(!this.state.bankNoPassed){
            alert('请输入正确的银行卡号');
            return false;
        }
        this.setState({
            loading:true
        })
        this.props.authentication({
            userId:props.userId,
            name:this.state.name,
            pid:this.state.idCard,
            parentBankId:this.state.bankId,
            cityId:this.state.city,
            capAcntNo:this.state.bankNo,
            callback:(result)=>{
                this.setState({
                    loading:false
                })
                if(result.r==1){
                    this.props.fetchAccount();
                    alert('银行卡绑定成功');
                    browserHistory.goBack()
                }else{
                    alert(result.msg);
                }
            }
        })
    }
    provinceChange(ev){
        this.fetchCity(ev.target.value);
        this.setState({
            province:ev.target.value
        })
    }
    cityChange(ev){
        this.setState({
            city:ev.target.value
        })
    }
    bankChange(ev){
        this.setState({
            bankId:ev.target.value
        })
    }
    render() {
        return (
            <section className="level-2-wrap" style={{backgroundColor:'#fff'}}>
                <RootLoading display={this.state.loading}/>
                <section className="authentication-wrap">
                    <div className={`step-title ${this.state.activeStep==1?'active':''}`}>
                        实名认证
                    </div>
                    <div className={`step-content ${this.state.activeStep==1?'active':''}`}>
                        <IconInput
                            placeholder="真实姓名"
                            rule="^[\u4e00-\u9fa5]{2,}$"
                            contentClass='authenticationInput'
                            callback={(b,val)=>{this.setState({name:val,namePassed:b});this.checkStep1()}}>
                        </IconInput>
                        <IconInput
                            placeholder="身份证"
                            rule="^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$"
                            contentClass='authenticationInput'
                            callback={(b,val)=>{this.setState({idCard:val,idCardPassed:b});this.checkStep1()}}>
                        </IconInput>
                        <button className={`base-button ${this.state.firstStepPassed ? '' :'disabled'}`} disabled={!this.state.firstStepPassed} onClick={this.doStep1.bind(this)} style={{width:'95%',borderRadius:0,marginTop:'15px'}}>
                            {this.state.firstStepText}
                        </button>
                    </div>
                    <div className={`step-title ${this.state.activeStep==2?'active':''}`}>
                        绑定银行卡
                    </div>
                    <div className={`step-content ${this.state.activeStep==2?'active':''}`}>
                        <p>持卡人：{this.state.name}</p>
                        <p>{this.props.mobile}</p>
                        <select onChange={this.bankChange.bind(this)}>
                            {
                                this.props.bankData.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.value}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <div className="bink-bank-address-wrap">
                            <select onChange={this.provinceChange.bind(this)}>
                                <option>-请选择省份-</option>
                                {
                                    this.props.provinceData.map((item,index)=>{
                                        return(
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                            <select onChange={this.cityChange.bind(this)}>
                                <option>-请选择城市-</option>
                                {
                                    this.state.cityData.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.code}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <IconInput
                            placeholder="银行卡号"
                            rule="^\d{16,20}$"
                            contentClass='authenticationInput'
                            callback={(b,val)=>{this.setState({bankNo:val,bankNoPassed:b})}}>
                        </IconInput>
                        <button className="base-button" style={{width:'95%',borderRadius:0,marginTop:'15px'}} onClick={this.doStep2.bind(this)}>
                            实名认证
                        </button>
                    </div>
                </section>
            </section>
        )
    }
}
BindBankPage.propTypes = {
    bankData: PropTypes.array.isRequired,
    asyncCheckId:PropTypes.func.isRequired,
    fetchCity:PropTypes.func.isRequired,
    userId:PropTypes.string.isRequired
}
BindBankPage.defaultProps = {
    asyncCheckId:()=>{},
    fetchCity:()=>{},
    userId:'',
    bankData: [
        {
            value:'0102',
            name:'中国工商银行'
        },
        {
            value:'0103',
            name:'中国农业银行'
        },
        {
            value:'0104',
            name:'中国银行'
        },
        {
            value:'0105',
            name:'中国建设银行'
        },
        {
            value:'0302',
            name:'中信实业银行'
        },
        {
            value:'0301',
            name:'交通银行'
        },
        {
            value:'0303',
            name:'中国光大银行'
        },
        {
            value:'0304',
            name:'华夏银行'
        },
        {
            value:'0305',
            name:'中国民生银行'
        },
        {
            value:'0306',
            name:'广东发展银行'
        },
        {
            value:'0307',
            name:'平安银行股份有限公司'
        },
        {
            value:'0308',
            name:'招商银行'
        },
        {
            value:'0309',
            name:'兴业银行'
        },
        {
            value:'0310',
            name:'上海浦东发展银行'
        },
        {
            value:'0403',
            name:'中国邮政储蓄银行有限责任公司'
        }

    ],
    provinceData:[
        "广东省",
        "山西省",
        "广西壮族自治区",
        "海南省",
        "重庆市",
        "四川省",
        "贵州省",
        "西藏自治区",
        "湖南省",
        "内蒙古自治区",
        "辽宁省",
        "吉林省",
        "黑龙江省",
        "上海市",
        "江苏省",
        "浙江省",
        "河南省",
        "陕西省",
        "甘肃省",
        "青海省",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "山东省",
        "湖北省",
        "安徽省",
        "福建省",
        "江西省",
        "北京市",
        "天津市",
        "云南省",
        "海南省",
        "河北省"
    ]
}
