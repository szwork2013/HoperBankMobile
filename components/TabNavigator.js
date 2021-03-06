import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
export default class TabNavigator extends Component {
    constructor(props) {
        super(props);
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    render() {
        return (
            <section className="main-foot-nav">
                <Link to={{pathname:'/home'}} activeClassName="active" >
                    <i className="i1"></i>
                    <p>首页</p>
                </Link>
                <Link to="/financial" activeClassName="active">
                    <i className="i2"></i>
                    <p>出借</p>
                </Link>
                <Link to='/discover' activeClassName="active">
                    <i className="i3"></i>
                    <p>发现</p>
                </Link>
                <Link to="/my" activeClassName="active">
                    <i className="i4"></i>
                    <p>我的</p>
                </Link>
            </section>
        )
    }
}