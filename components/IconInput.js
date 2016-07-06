import React, { Component, PropTypes } from 'react'
export default class IconInput extends Component {
  constructor(props) {
    super(props)
    this.state={
      passed:false
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
          <div className={props.hasBorder ? 'icon-input-con' : 'icon-input-con icon-input-no-border'}>
            <i className={'icon '+props.icon}></i>
            <input type={props.type} placeholder={props.placeholder} onChange={this.handleChange.bind(this,[props.rule,props.callback])} />
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
}
IconInput.defaultProps = {
  placeholder: 'button',
  type:'text',
  icon:'',
  hasBorder:true,
  rule:'*'
}
