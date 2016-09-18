import React, { Component, PropTypes } from 'react'
export default class IconInput extends Component {
    constructor(props) {
        super(props)
        this.state={
            passed:false,
            type:props.type,
            eyesStatus:'closed'
        }
    }
    handleChange(arr,e){
        var reg = new RegExp(arr[0],'g');
        arr[1] && arr[1](reg.test(e.target.value),e.target.value);
    }
    render() {
        const props = this.props;
        return (
            <div className={"icon-input-wrap"} onClick={props.onClick}>
                {props.children}
                <div className={`${props.hasBorder ? 'icon-input-con' : 'icon-input-con icon-input-no-border'} ${props.contentClass}`} >
                    {props.icon && <i className={'icon '+props.icon}></i>}
                    <input type={this.state.type} placeholder={props.placeholder} onChange={this.handleChange.bind(this,[props.rule,props.callback])} />
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
IconInput.propTypes = {
    placeholder: PropTypes.string,
    icon:PropTypes.string,
    hasBorder:PropTypes.bool,
    type:PropTypes.string,
    rule:PropTypes.string,
    contentClass:PropTypes.string
}
IconInput.defaultProps = {
    placeholder: 'button',
    type:'text',
    icon:'',
    contentClass:'',
    hasBorder:true,
    rule:'*'
}
