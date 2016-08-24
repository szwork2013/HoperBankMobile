import React, { Component, PropTypes } from 'react'
export default class BorrowListPage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
    }
    render() {
        const {borrowProductList} = this.props.location.state;
        return(
            <section className="level-2-wrap">
                {
                    borrowProductList.map((item,index)=>{
                        return (
                            <div key={index}>
                                {index}
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}
