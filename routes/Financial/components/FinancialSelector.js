import React, { Component, PropTypes } from 'react'
export default class FinancialSelector extends Component {
    constructor(props) {
        super(props)
        this.state={
            orderBy:1
        }
        this.changeOrder = this.changeOrder.bind(this);
        this.toggleOrder = this.toggleOrder.bind(this);
        this.isActive = this.isActive.bind(this)
        this.getDirection = this.getDirection.bind(this)
    }
    componentWillMount() {

    }
    changeOrder(n){
        this.setState({
            orderBy:n
        })
        this.props.callback(n)
    }
    toggleOrder(a,b){
        const orderBy = this.state.orderBy;
        if(orderBy !==a && orderBy!==b){
            this.changeOrder(a)
            return;
        }
        if(orderBy ==a){
            this.changeOrder(b)
        }
        if(orderBy ==b){
            this.changeOrder(a)
        }
    }
    isActive(a,b){
        return (this.state.orderBy == a || this.state.orderBy==b)
    }
    getDirection(a,b){
        if(this.isActive(a,b)){
            return this.state.orderBy == a ? 'up' : 'down';
        }

    }
    render(){
        return(
            <ul className="financial-nav">
                <li className={this.state.orderBy == 1 ? 'active ' : ''} onClick={()=>{this.changeOrder(1)}}>默认</li>
                <li className={(this.isActive(6,7) ? 'active ' : ' ') + this.getDirection(6,7)} onClick={()=>{this.toggleOrder(6,7)}}><span>年利率</span><i></i></li>
                <li className={(this.isActive(4,5) ? 'active ' : ' ') + this.getDirection(4,5)} onClick={()=>{this.toggleOrder(4,5)}}><span>期限</span><i></i></li>
                <li className={(this.isActive(2,3) ? 'active ' : ' ') + this.getDirection(2,3)} onClick={()=>{this.toggleOrder(2,3)}}><span>进度</span><i></i></li>
            </ul>
        )
    }
}
FinancialSelector.propTypes = {
    callback:PropTypes.func
}
FinancialSelector.defaultProps = {
    callback:()=>{}
}