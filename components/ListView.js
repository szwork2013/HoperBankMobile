import React, { Component, PropTypes } from 'react'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'
import RefreshView from '../components/RefreshView';
export default class ListView extends Component {
    constructor(props) {
        super(props)
        this.state={
            scrollToBottom:false,
            currentPage:1,
            loaderText:'上拉加载更多',
        }
        this.onScrollEnd =  this.onScrollEnd.bind(this);
        this.onScroll =  this.onScroll.bind(this);
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
        if(this.props.isFetching) return false
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
            console.log(this.props.params)
            this.props.fetchFunc({
                curPage:this.state.currentPage,
                params:this.props.params,
                callback:()=>{

                    this.setState({
                        scrollToBottom:false
                    })
                }
            })
        }
    }
    onRefresh(){

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.dataSource.length == 0){
            this.setState({
                currentPage:1
            })
        }
    }

    onBeforeScrollStart(){
    }
    render() {
        const props = this.props;
        return (
            <div className="list-view-wrap" style={props.style || null}>
                <ReactIScroll iScroll={iScroll}
                              options={props.options}
                              onScrollEnd={this.onScrollEnd}
                              onRefresh={this.onRefresh}
                              onScroll={this.onScroll}
                              onScrollStart={this.onScrollStart}>

                    <div className={"list-view-scroller " + props.wrapperClass }>
                        {
                            props.dataSource.map((item,index)=>{
                                return props.renderRow(item,index)
                            })
                        }
                    </div>

                </ReactIScroll>
                <RefreshView text={this.state.loaderText} display={this.state.scrollToBottom} />
            </div>
        )
    }
}
ListView.propTypes = {
    dataSource:PropTypes.array,
    renderRow:PropTypes.func,
    wrapperClass:PropTypes.string
}
ListView.defaultProps = {
    dataSource:[],
    renderRow:()=>{},
    wrapperClass:'',
    options: {
        mouseWheel: true,
        scrollbars: false,
        probeType: 1,
    }
}