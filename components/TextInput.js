import React, { Component, PropTypes } from 'react'
export default class TextInput extends Component {
    constructor(props) {
        super(props)
        this.state={
            passed:false,
            type:props.type,
            eyesStatus:'closed'
        }
    }
    static propTypes = {
        placeholder: PropTypes.string,
        text:PropTypes.string,
        hasBorder:PropTypes.bool,
        type:PropTypes.string,
        rule:PropTypes.string,
        contentClass:PropTypes.string,
        defaultValue:PropTypes.string
    }
    static defaultProps = {
        placeholder: 'button',
        type:'text',
        text:'',
        contentClass:'',
        hasBorder:true,
        rule:'*',
        defaultValue:''
    }
    handleChange(arr,e){
        var reg = new RegExp(arr[0],'g');
        arr[1] && arr[1](reg.test(e.target.value),e.target.value);
    }
    render() {
        const props = this.props;
        return (
            <div className={"text-input-wrap"} onClick={props.onClick}>
                {props.children}
                <div className={`${props.hasBorder ? 'text-input-con' : 'text-input-con text-input-no-border'} ${props.contentClass}`} >
                    {props.text && <span className="text-input-text">{props.text}</span>}
                    {props.type =='select'? props.select:<input type={this.state.type} className={`${props.text ? '':'no-text'}`} placeholder={props.placeholder} defaultValue={this.props.defaultValue} onChange={this.handleChange.bind(this,[props.rule,props.callback])} />}
                    {
                        this.props.type =='password' && <div className={`eyes ${this.state.eyesStatus=='open' ? 'open' : ''}`} onClick={
                        ()=>{
                          if(this.state.type=='password'){
                                this.setState({
                                    type:'text',
                                    eyesStatus:'open'
                                })
                          }else{
                              this.setState({
                                    type:'password',
                                    eyesStatus:'closed'
                                })
                          }
                        }}></div>
                    }
                </div>
            </div>
        )
    }
}
