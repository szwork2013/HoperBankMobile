import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchFWList,clearProduct,setFetching } from '../actions'
import RootLoading from '../components/RootLoading'
import ListView from '../components/ListView'
import FinancialSelector from './FinancialSelector'
class FinancialServicesList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
    }
    componentWillMount() {
        //先清除产品2数据
        this.props.clearProduct(2);
        this.props.fetchFWList(1,()=>{
            this.setState({
                loaded:true
            })
        })
    }
    componentWillReceiveProps(nextProps) {

    }
    render(){
        return(
            <div className="financial-box" >
                <FinancialSelector />
                <ListView
                    dataSource={this.props.product.type2}
                    renderRow={this.renderItem}
                    fetchFunc={this.props.fetchFWList}
                    wrapperClass='financial-ul'
                    isFetching={this.props.isFetching}>
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    renderItem(item,index){
        return(
                <div key={index} className='financial-li'>
                    <h2>{item.title}</h2>
                    <div>
                        <div className="part-1">
                            <p className="p1">{item.rate}<span style={{fontSize:'18px'}}>%</span></p>
                            <p className="p2">预期年收益率</p>
                        </div>
                        <div className="part-2">
                            <p className="p1">{item.limit}个月</p>
                            <p className="p2">期限</p>
                        </div>
                        <div className="part-3">
                            <a href="product.html?productId=10005">立投</a>
                        </div>
                    </div>
                </div>
            )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        product:state.product,
        isFetching:state.isFetching
    }
}

export default connect(mapStateToProps, {
    fetchFWList,
    clearProduct,
    setFetching
})(FinancialServicesList)
