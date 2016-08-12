/*
* 这个页面是用来选择使用哪个投资页面的
* InvestPage1 为理财投资页面
* InvestPage2 为优选服务、债权转让投资页面
* */

import React, { Component, PropTypes } from 'react'
import InvestPage1 from '../containers/InvestPage1'
import InvestPage2 from '../containers/InvestPage2'
export default class InvestMainPage extends Component {
    constructor(props){
        super(props);
    }
    switchComponent(){
        switch (parseInt(this.props.params.productType)){
            case 1:
                return <InvestPage1 {...this.props} />;
                break;
            case 9:
                return <InvestPage2 {...this.props} />;
                break;
            case 5:
                return <InvestPage2 {...this.props} />;
                break;
        }
    }
  render() {
    return this.switchComponent.bind(this)()
  }
}