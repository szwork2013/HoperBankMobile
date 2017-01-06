import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTempRecordDetail } from 'actions'
import RootLoading from 'components/RootLoading'
import config from 'componentConfig'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'

class TempRecordDetail extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
    }
    componentWillMount() {

        this.props.fetchTempRecordDetail({
            type:this.props.params.type,
            id:this.props.params.id,
            callback:(res)=>{
                res.r==1 && this.setState({
                    loaded:true
                })
                //设置title
                $('title').html(this.props.dealRecordDetail.title)
            }
        })
    }
    componentWillUnmount(){
        //重新设置title
        $('title').html("琥珀金服");
    }
    render(){
        const dealRecordDetail = this.props.dealRecordDetail;
        return(

            <div className="level-2-wrap absolute" >
                <ReactIScroll iScroll={iScroll}>
                    <div className="temp-record-detail-wrap">
                        <h3>{dealRecordDetail && dealRecordDetail.title}</h3>
                        <p>
                            <span>{dealRecordDetail && dealRecordDetail.date}</span>
                        </p>
                        <div dangerouslySetInnerHTML={{__html:dealRecordDetail && dealRecordDetail.content}}>
                        </div>
                    </div>
                </ReactIScroll>
                <RootLoading display={!this.state.loaded}/>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        dealRecordDetail:state.tempRecord.detail
    }
}

export default connect(mapStateToProps, {
    fetchTempRecordDetail
})(TempRecordDetail)
