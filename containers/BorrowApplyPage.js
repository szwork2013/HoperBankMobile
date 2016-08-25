import React, { Component, PropTypes } from 'react'
import {charge} from '../actions'
import {reduxForm} from 'redux-form';
import {BaseButton,TextButton} from '../components/Button'
import RootLoading from '../components/RootLoading'
export const fields = [ 'name','sex','mobile','typeId','money','cycle']
const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }


/*
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }*/
    return errors
}
class BorrowApplyPage extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    check(){
        alert(1)
        return false;
    }
    render(){
        const {fields: {name,sex,mobile,typeId,money,cycle}, handleSubmit} = this.props;
        return(
            <section className="level-2-wrap">
                <form onSubmit={handleSubmit(this.check)} ref="form">
                    <div className="borrow-apply-wrap">
                        <div className="borrow-apply-item">
                            <label >姓名</label>
                            <input type="text" placeholder="请输入姓名" {...name}/>
                            {name.touched && name.error && <div>{name.error}</div>}
                        </div>
                        <div className="borrow-apply-item">
                            <label >称谓</label>
                            <select {...sex}>
                                <option value="0">先生</option>
                                <option value="1">女士</option>
                            </select>
                        </div>
                        <div className="borrow-apply-item">
                            <label >联系电话</label>
                            <input type="text" placeholder="请输入联系电话" {...mobile}/>
                            {mobile.touched && mobile.error && <div>{mobile.error}</div>}
                        </div>
                        <div className="borrow-apply-item">
                            <label >借款人类型</label>
                            <select {...typeId}>
                                <option value="0">个人</option>
                                <option value="1">企业</option>
                            </select>
                        </div>
                        <div className="borrow-apply-item">
                            <label >借款金额</label>
                            <input type="text" placeholder="请输入借款金额" {...money}/>
                            {money.touched && money.error && <div>{money.error}</div>}
                        </div>
                        <div className="borrow-apply-item">
                            <label >借款期限</label>
                            <input type="text" placeholder="请输入借款金额" {...cycle}/>
                            {cycle.touched && cycle.error && <div>{cycle.error}</div>}
                        </div>
                    </div>
                    <button className="base-button" type="submit" >提交申请</button>
                </form>

            </section>
        )
    }
}
/*BorrowApplyPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};*/
BorrowApplyPage.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
    form: 'contact',
    fields,
    asyncBlurFields:['name','sex','mobile','typeId','money','cycle'],
    validate
})(BorrowApplyPage);

