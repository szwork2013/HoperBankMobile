import React, { Component, PropTypes } from 'react'

export default class RootLoading extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(){
    this.refs.content.setAttribute('style','left:100')
  }
  render() {
    return (
      <div className={'root-loading '+ this.props.className}>
        <div className="root-loading-bg"></div>
        <div ref="content" className="root-loading-con"></div>
      </div>
    )
  }
}
