import React, { Component, PropTypes } from 'react'
export default class Selector extends Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    static defaultProps = {
        data:[
            {
                param:"type",
                group:[
                    {
                        text:'全部',
                        value:0
                    },
                    {
                        text:'大大',
                        value:1
                    }
                ]
            },
            {
                param:"time",
                group:[
                    {
                        text:'全部',
                        value:0
                    },
                    {
                        text:'一周内',
                        value:1
                    }
                ]
            }
        ]
    }
    constructor(props){
        super(props);
       /* var params =[];
        props.data.map((item,index)=>{
            params.push({
                param:item.param,
                value:item.group[0].value,
                text:item.group[0].text
            })
        })
        console.log(params)*/
        this.state={
            currentGroup:props.data[0],
            groupsShouldShow:false
        }
        this.renderGroup=this.renderGroup.bind(this);
    }
    renderGroup(item,index,length){
        return(
            <div className="selector-title-item" key={index} style={{width:(100/length)+'%'}}
                 onClick={()=>{
                    this.setState({
                        groupsShouldShow:true,
                        currentGroup:item
                    })
                 }}
            >
                <div className="selector-title-item-txt">{item.group[0].text}</div>
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
                        return this.renderGroup(item,index,length)
                    })
                }
                <SelecterGroup list={this.state.currentGroup.group} display={this.state.groupsShouldShow}
                               onClick={()=>{}}
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
                            <div className="selector-group-item" onClick={this.props.onClick} key={index} >
                                {item.text}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}