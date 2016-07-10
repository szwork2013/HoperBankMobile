import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchLCList } from '../actions'
import ReactIScroll from 'react-iscroll'
import iScroll from 'iscroll/build/iscroll-probe';
import RootLoading from '../components/RootLoading'
class FinancialList extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
        this.renderItem = this.renderItem.bind(this);
    }

    componentWillMount() {
        //loadData(this.props)
        this.props.fetchLCList(()=>{
            this.setState({
                loaded:true
            })
        })
    }
    componentDidMount(){

    }

    componentWillReceiveProps(nextProps) {

    }
    onScrollStart() {
        console.log("iScroll starts scrolling")
    }
    render() {

        return(
            <ReactIScroll iScroll={iScroll}
                          options={this.props.options}
                          onScrollStart={this.onScrollStart}>

                <ul className="financial-ul">
                    {
                        this.state.loaded && this.renderItem()
                    }
                </ul>
                <RootLoading display={!this.state.loaded}/>
            </ReactIScroll>

        )
    }
    renderItem(){
        const data = this.props.product.type1
        var arr = [];
        data.map((item,index)=>{
            arr.push(
                <li key={index}>
                    <h2>{item.name}</h2>
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
        options: {
            mouseWheel: true,
            scrollbars: false
        }
    }
}

export default connect(mapStateToProps, {
    fetchLCList
})(FinancialList)
