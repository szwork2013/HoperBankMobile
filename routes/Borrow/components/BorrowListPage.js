import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'
import config from 'componentConfig'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
export default class BorrowListPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {list} = this.props;
        return(
            <section className="level-2-wrap">
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children
                    }
                </ReactCSSTransitionGroup>
                <ReactIScroll iScroll={iScroll} options={{
                        scrollbars: false,
                        click:config.isScrollClick
                    }}>
                    <div style={{paddingBottom:'80px'}}>
                        {
                            list && list.map((item,index)=>{
                                return (
                                    <Link to="/discover/borrow/apply"  key={index} className="borrow-product-item">
                                        <div>
                                            <div className="part-1">
                                                <img src={`/static/img/borrow-icon-${item.type}.png`} />
                                            </div>
                                            <div className="part-2">
                                                <p>金额</p>
                                                <p>{item.amt}</p>
                                            </div>
                                            <div className="part-3">
                                                <p>期限</p>
                                                <p>{item.expires}</p>
                                            </div>
                                            <div className="part-4">
                                                <p>综合费率</p>
                                                <p>{item.rate}</p>
                                            </div>
                                        </div>
                                        <h2>{item.name}</h2>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </ReactIScroll>
            </section>
        )
    }
}
