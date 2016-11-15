import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
class InvitationPage extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    setTimeout(()=>{
      $(this.refs.code).qrcode({
        "render":'image',
        "size": 150,
        "color": "#3a3",
        "text": `https://www.hoperbank.com/reg/html?inviteMobile=${this.props.account.fullMobile}`,
        "background":'#fff'
      });
    },300)

  }
  render() {
    const props = this.props;
    return (
        <section className="level-2-wrap">
          <section className="invitation-wrap">
            <div className="part-1">
              <p className="p1">HOPER</p>
              <p className="p2">琥珀金服</p>
            </div>
            <div className="part-2">
              <p className="p1">扫一扫下面我的推荐码</p>
              <div className="code animated zoomIn" style={{animationDelay:'300ms',animationDuration:0.2}} ref='code'>
              </div>
              <p className="p2">
                我的链接:<input type="text" defaultValue={`https://www.hoperbank.com/reg/html?inviteMobile=${this.props.account.fullMobile}`} />
              </p>
              <p className="p3">
                长按上方链接 -> 全选 -> 复制将注册链接发给好友。
              </p>
            </div>
          </section>
        </section>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    account:state.account
  }
}

export default connect(mapStateToProps, {

})(InvitationPage)
