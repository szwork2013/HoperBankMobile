import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchFWList,clearProduct } from '../actions'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe';
import RootLoading from '../components/RootLoading'
import RefreshView from '../components/RefreshView';
class FinancialServicesList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false,
            scrollToBottom:false,
            currentPage:1,
            loaderText:'上拉加载更多',
        }
        this.renderItem = this.renderItem.bind(this);
        this.onScrollEnd =  this.onScrollEnd.bind(this);
        this.onScroll =  this.onScroll.bind(this);
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
    componentDidMount(){
    }
    onScrollStart() {
    }
    onScrollEnd(){
        this.setState({
            scrollToBottom:false
        })
    }
    onScroll(ins){
        var curY = ins.y,
            maxY = ins.maxScrollY
        if(this.props.fetching) return false
        if(curY<(maxY-20)){
            this.setState({
                loaderText:'上拉加载更多',
                scrollToBottom:true
            })

        }
        if(curY<(maxY-60)){
            this.setState({
                loaderText:'loading……',
                currentPage:this.state.currentPage+1
            })
           this.props.fetchFWList(this.state.currentPage,(data)=>{
                this.setState({
                    scrollToBottom:false
                })
            })
        }
    }
    onRefresh(){

    }
    onBeforeScrollStart(){
    }
    render() {
        console.log('render')
        return(
            <div className="financial-box">
                <ReactIScroll iScroll={iScroll}
                              options={this.props.options}
                              onScrollEnd={this.onScrollEnd}
                              onRefresh={this.onRefresh}
                              onScroll={this.onScroll}
                              onScrollStart={this.onScrollStart}>

                    <ul className="financial-ul">
                        {
                            this.state.loaded && this.renderItem()
                        }
                    </ul>

                </ReactIScroll>
                <RefreshView text={this.state.loaderText} display={this.state.scrollToBottom} />
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        console.log('数组改变了')
    }
    renderItem(){
        const data = this.props.product.type2
        //console.log(data)
        var arr = [];
        data.map((item,index)=>{
            arr.push(
                <li key={index}>
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
                </li>
            )
        })
        return arr
    }
}


function mapStateToProps(state, ownProps) {
    return {
        product:state.product,
        fetching:state.fetching,
        options: {
            mouseWheel: false,
            scrollbars: false,
            probeType: 1
        }
    }
}

export default connect(mapStateToProps, {
    fetchFWList,
    clearProduct
})(FinancialServicesList)
