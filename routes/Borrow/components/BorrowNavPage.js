import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
class BorrowNavPage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
    }
    static PropTypes = {
        borrowProductList: PropTypes.array.isRequired,
        borrowApplyAction:PropTypes.func.isRequired
    }
    static defaultProps = {
        borrowProductList:[]
    }
    render() {
        const {children,borrowProductList,borrowApplyAction} = this.props;
        return (
            <section>
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        children && React.cloneElement(children, {
                            list: borrowProductList,
                            applyAction:borrowApplyAction
                        })
                    }
                </ReactCSSTransitionGroup>
                <div className="borrow-banner">
                    <img src="/static/img/loan_1080_546.jpg" width="100%" />
                </div>
                <Link className="borrow-nav-item" to="/borrow/list" >
                    <div className="borrow-nav-icon"></div>
                    <div className="borrow-nav-info">
                        <h2>快速申请</h2>
                        <p>优先接受深圳地区的借款申请，提交申请后我们将在2个工作日内和您取得联系。</p>
                    </div>
                </Link>
                <Link className="borrow-nav-item" to='/borrow/apply'>
                    <div className="borrow-nav-icon icon2"></div>
                    <div className="borrow-nav-info">
                        <h2>合作项目</h2>
                        <p>优先接受深圳地区的借款申请，提交申请后我们将在2个工作日内和您取得联系。</p>
                    </div>
                </Link>
            </section>
        )
    }
}

module.exports = BorrowNavPage