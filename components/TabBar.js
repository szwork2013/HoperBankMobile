import React, { Component, PropTypes } from 'react'
import { browserHistory,Link } from 'react-router'
import { connect } from 'react-redux'
class TabBar extends Component {

  constructor(props) {
    super(props)
    this.state={
      currentIndex:0
    }
  }
  getTitleItemCssClasses(index){
    return index === this.state.currentIndex ? "tab-title-item active" : "tab-title-item";
  }

  getContentItemCssClasses(index){
    return index === this.state.currentIndex ? "tab-content-item active" : "tab-content-item";
  }

  render() {
    let that = this;
    const length = this.props.children.length
    return (
        <div className="tab-wrap">
          <nav className="tab-title-items">
            {React.Children.map(this.props.children, (element, index) => {
              return (
                  <div
                      onClick={() => {this.setState({currentIndex: index})}}
                      className={that.getTitleItemCssClasses(index)} style={{width:(100/length)+'%'}}>
                    {element.props.name}
                  </div>
              )
            })}
          </nav>
          <div className="tab-content-items"  style={{height:$(window).height()-98 +'px'}}>
            {React.Children.map(this.props.children, (element, index) => {
              return (
                  <div className={that.getContentItemCssClasses(index)}>
                    {element}
                  </div>
              )
            })}
          </div>
        </div>
    )
  }
}
export class TabBarItem extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    const props = this.props;
    return (
        <div className="" name={props.name}>
          {props.children}
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selected: ''
  }
}

export default connect(mapStateToProps)(TabBar)

/*
List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
}

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...'
}
*/
