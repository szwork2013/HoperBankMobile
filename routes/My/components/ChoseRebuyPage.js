import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {reBuyOperation,fetchLCList,setInvestRecordShouldUpdate} from 'actions'
import {BaseButton} from 'components/Button'
import RootLoading from 'components/RootLoading'
class ChoseRebuyPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false,
            selectedProductId:10002,
            disabled:false
        }
        this.reBuy = this.reBuy.bind(this);
    }
    componentWillMount() {
        if(this.props.product.length==0){
            this.props.fetchLCList(()=>{
                this.setState({
                    loaded:true
                })
            })
        }else{
            this.setState({
                loaded:true
            })
        }
    }
    componentDidMount(){
    }
    render() {
        const props = this.props;
        return (
            <section className="level-2-wrap">
                <RootLoading display={!this.state.loaded}/>
                <div id="select-product-wrap">
                    <p>产品类型</p>
                    {
                        props.product.map((item,index)=>{
                            return (
                                <div className={`select-product-item ${item.productId==this.state.selectedProductId?'selected':''}`}
                                     onClick={()=>{
                                        this.setState({
                                            selectedProductId:item.productId
                                        })
                                     }}
                                     key={index}>
                                    <span className="s1">{item.name}</span>
                                    <span className="s2">{item.limit+'个月'}</span>
                                    <span className="s3">{item.rate+'%'}</span>
                                </div>
                            )
                        })
                    }
                    <p className="rebuy-direction-btn"><span>续投说明</span></p>

                </div>
                <BaseButton text="确认续投" disabled={this.state.disabled} className={this.state.disabled?'disabled':''} onClick={this.reBuy}/>
            </section>
        )
    }
    reBuy(){
        const props = this.props;
        this.setState({
            disabled:true,
            loaded:false
        })
        props.reBuyOperation({
            userId:props.account.userId,
            productId:this.state.selectedProductId,
            investId:props.location.query.investId,
            operation:props.location.query.operation,
            callback:(result)=>{
                this.setState({
                    disabled:false,
                    loaded:true
                })
                if(result.r==1){
                    setTimeout(()=>{
                        alert('续投成功!');
                        props.setInvestRecordShouldUpdate(true);
                        browserHistory.goBack()
                    },300)

                }else{
                    setTimeout(()=>{
                        alert(result.msg)
                    },300)
                }
            }
        })
    }
}
function mapStateToProps(state, ownProps) {
    return {
        account:state.account,
        product:state.product.type1
    }
}

export default connect(mapStateToProps, {
    reBuyOperation,
    fetchLCList,
    setInvestRecordShouldUpdate
})(ChoseRebuyPage)
