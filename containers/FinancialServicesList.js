import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchFWList,clearProduct,setFetching } from '../actions'
import RootLoading from '../components/RootLoading'
import ListView from '../components/ListView'
import FinancialSelector from './FinancialSelector'
import ProgressBar from '../static/lib/react-progressbar'

class FinancialServicesList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false,
            orderBy:1,
            params:{
                orderBy:1
            }
        }
        this.fetchFunc = this.fetchFunc.bind(this);
    }
    componentWillMount() {
        //先清除产品2数据
        this.props.clearProduct(2);
        this.props.fetchFWList({
            curPage:1,
            orderBy:1,
            callback:()=>{
                this.setState({
                    loaded:true
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {

    }
    fetchFunc(opt){
            this.props.fetchFWList({
                curPage:opt.curPage,
                orderBy:opt.params.orderBy,
                callback:opt.callback
            })
    }
    render(){
        const props = this.props;
        return(
            <div className="financial-box" >
                <FinancialSelector callback={(orderBy)=>{
                    //先清除产品
                    props.clearProduct(2);
                    this.setState({
                        params:{
                            orderBy:orderBy
                        }
                    });
                    props.fetchFWList({
                        curPage:1,
                        orderBy:orderBy
                    })
                }} />
                <ListView
                    dataSource={props.product.type2}
                    renderRow={this.renderItem}
                    fetchFunc={this.fetchFunc}
                    wrapperClass='financial-ul'
                    params={this.state.params}
                    isFetching={props.isFetching}>
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    renderItem(item,index){
        var options = {
            strokeWidth: 10
        };
        var containerStyle = {
            width: '80px',
            height: '80px'
        };
        var Circle = ProgressBar.Circle;
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
                            <Circle
                                progress={item.progress}
                                text={item.progress+'%'}
                                options={options}
                                initialAnimate={true}
                                containerStyle={containerStyle}
                                containerClassName={'.progressbar'} />
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
