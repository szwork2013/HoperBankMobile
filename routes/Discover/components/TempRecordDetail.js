import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTempRecordDetail } from 'actions'
import config from 'componentConfig'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll'

class TempRecordDetail extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        $('.main-foot-nav').hide();
        this.props.fetchTempRecordDetail({
            type:this.props.params.type,
            id:this.props.params.id,
            callback:(res)=>{
                //设置title
                $('title').html(this.props.location.query.title)
            }
        })
    }
    componentWillUnmount(){
        //重新设置title
        $('.main-foot-nav').show();
        $('title').html("琥珀金服");
    }
    render(){
        const dealRecordDetail = this.props.dealRecordDetail;
        return(
            <div className="level-2-wrap absolute" >
                    <div className="temp-record-detail-wrap">
                        <h3>{this.props.location.query.title}</h3>
                        <p>
                            <span>{this.props.location.query.date}</span>
                        </p>
                        <div dangerouslySetInnerHTML={{__html:dealRecordDetail}}>
                        </div>
                    </div>
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
