import React, { Component, PropTypes } from 'react'
export default class Selector extends Component{
    static propTypes = {
        data:PropTypes.array.isRequired,
        selectCallback:PropTypes.func
    }
    static defaultProps = {
        data:[]
    }
    constructor(props){
        super(props);
        var param = {};
        if(props.data.length!==0){
            for(let item of props.data){
                param = Object.assign({},param,{
                    [item.param]:{
                        value:item.group[0].value,
                        text:item.group[0].text
                    }
                })
            }
        }

        this.state={
            currentGroup:props.data[0] || {},
            groupsShouldShow:false,
            params:param
        }
        this.renderGroup=this.renderGroup.bind(this);
    }
    renderGroup(item,index,length,param){
        return(
            <div className="selector-title-item" key={index} style={{width:(100/length)+'%'}}
                 onClick={()=>{
                    this.setState({
                        groupsShouldShow:true,
                        currentGroup:item
                    })

                 }}
            >
                <div className={`selector-title-item-txt ${(this.state.currentGroup.param === param && this.state.groupsShouldShow) ? "active" :'' }`}>
                    <span>{this.state.params[param]['text']}</span>
                    <i></i>
                </div>
            </div>
        )
    }
    render() {
        const data = this.props.data;
        const length = data.length;
        return (
            <div className="selector-wrap">
                {
                    data.map((item,index)=>{
                        return this.renderGroup(item,index,length,item.param)
                    })
                }
                <SelecterGroup list={this.state.currentGroup.group} selected={this.state.params[this.state.currentGroup.param]['value']} display={this.state.groupsShouldShow}
                               onClick={(value,text)=>{
                                    this.setState({
                                        groupsShouldShow:false,
                                         params:Object.assign({},this.state.params,{
                                                [this.state.currentGroup.param]:{
                                                    value:value,
                                                    text:text
                                                }
                                            })
                                    },function(){
                                        this.props.selectCallback && this.props.selectCallback(this.state.params)
                                    })
                               }}
                />
                <div className={`selector-overlay ${this.state.groupsShouldShow ? 'show':''}`} onClick={()=>this.setState({groupsShouldShow:false})}></div>
            </div>
        )
    }
}
class SelecterGroup extends Component{
    constructor(props){
        super(props);
    }
    static propTypes = {
        list:PropTypes.array.isRequired,
        onClick:PropTypes.func
    }
    static defaultProps = {
        list:[],
        onClick:()=>{

        }
    }
    render(){
        return(
            <div className={`selector-group-items ${this.props.display?'show' :''}`}  style={{width:window.innerWidth}}>
                {
                    this.props.list.map((item,index)=>{
                        return(
                            <div className="selector-group-item" onClick={()=>{this.props.onClick(item.value,item.text)}} key={index} >
                                {item.text}
                                {this.props.selected == index ? <div className="selected-sign"><img src="/static/img/ico_make.png" /></div> : null}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}