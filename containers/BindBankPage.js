import React, { Component, PropTypes } from 'react'
import {BaseButton,TextButton} from '../components/Button'
export default class BindBankPage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {

    }
    componentDidMount(){

    }
    render() {
        return (
            <section className="level-2-wrap" style={{backgroundColor:'#fff'}}>
                <section className="authentication-wrap">
                    <div className="step-title active">
                        实名认证
                    </div>
                    <div className="step-content">
                        <input type="text" placeholder="真实姓名" />
                        <input type="text" placeholder="身份证"  />
                        <button className="base-button" style={{width:'95%',borderRadius:0,marginTop:'15px'}}>
                            下一步
                        </button>
                    </div>
                    <div className="step-title">
                        绑定银行卡
                    </div>
                    <div className="step-content">
                        <p>持卡人：庄吉祥</p>
                        <p>150****8898</p>
                        <select>
                            {
                                this.props.bankData.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.value}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <input type="text" placeholder="真实姓名" />
                        <input type="text" placeholder="身份证"  />
                        <button className="base-button" style={{width:'95%',borderRadius:0,marginTop:'15px'}}>
                            下一步
                        </button>
                    </div>
                </section>
            </section>
        )
    }
}
BindBankPage.propTypes = {
    bankData: PropTypes.array.isRequired
}
BindBankPage.defaultProps = {
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

    ]
}
