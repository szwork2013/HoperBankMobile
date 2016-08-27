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
                            <div key={index} className="borrow-product-item">
                                <h2>{item.name}</h2>
                                <div>
                                    <div className="part-1">
                                        <img src={`/static/img/borrow-icon-${item.type}.png`} />
                                    </div>
                                    <div className="part-2">
                                        <p>金额</p>
                                        <p>{item.amt}</p>
                                    </div>
                                    <div className="part-3">
                                        <p>期限</p>
                                        <p>{item.expires}</p>
                                    </div>
                                    <div className="part-4">
                                        <p>综合费率</p>
                                        <p>{item.rate}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}
