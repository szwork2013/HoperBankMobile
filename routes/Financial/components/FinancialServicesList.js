/*
* 优选服务与债权转让列表
* @param   为1时调用的是优选服务，2时调用债权转让
* */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchFWList,clearProduct,setFetching } from 'actions'
import {Link} from 'react-router'
import RootLoading from 'components/RootLoading'
import ListView from 'components/ListView'
import FinancialSelector from './FinancialSelector'
import ProgressBar from 'react-progressbar'
import config from 'componentConfig'

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
        this.renderItem = this.renderItem.bind(this);
    }
    componentWillMount() {
        //先清除产品2数据
        this.props.clearProduct(2);
        this.props.fetchFWList({
            type:this.props.type,
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
                type:this.props.type,
                curPage:opt.curPage,
                orderBy:opt.params.orderBy,
                callback:opt.callback
            })
    }
    render(){
        const props = this.props;
        const iScrollHeight = config.windowHeight - config.navHeight - config.tabBarHeight - config.financialNavHeight - 20
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
                        type:props.type,
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
                    isFetching={props.isFetching}
                    style={{height:iScrollHeight}}
                >
                </ListView>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    renderItem(item,index){
        var options = {
            strokeWidth: 6,
            color: '#e3be4f',
            trailColor: '#D1D3D7',
        };
        var containerStyle = {
            width: '70px',
            height: '70px'
        };
        var Circle = ProgressBar.Circle;
        return(
                <Link to={`/financial/product/${this.props.type}/${item.projectId}`}
                      className={`financial-li animated fadeInLeft`} style={{animationDuration:0.5+(index%10 / 5)+'s'}}
                      key={index}>
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
                                progress={(item.progress/100)>1? 1 : (item.progress/100)}
                                text={(item.progress>100? 100:item.progress)+'%'}
                                options={options}
                                initialAnimate={true}
                                containerStyle={containerStyle}
                                containerClassName={'progressbar'} />
                        </div>
                    </div>
                </Link>
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
