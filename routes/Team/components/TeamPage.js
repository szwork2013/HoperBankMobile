import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { browserHistory,Link } from 'react-router'
import RootLoading from 'components/RootLoading'
class TeamPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            loaded:false
        }
    }
    static propTypes = {
        fetchTeam:PropTypes.func.isRequired,
        fetchTeamList:PropTypes.func.isRequired,
        clearTeamList:PropTypes.func.isRequired,
        fetchRoyaltyList:PropTypes.func.isRequired,
        royaltyList:PropTypes.array.isRequired,
        teamList:PropTypes.array.isRequired,
        team:PropTypes.object.isRequired
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    componentWillMount() {
        const props = this.props;
        props.fetchTeam(()=>{
            this.setState({loaded:true})
        })
    }
    render() {
        const team = this.props.team;
        return (
            <section>
                <RootLoading display={!this.state.loaded} />
                <ReactCSSTransitionGroup component="div"
                                         transitionName="slide-right"
                                         transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {
                        this.props.children && React.cloneElement(this.props.children, {
                            fetchTeamList:this.props.fetchTeamList,
                            clearTeamList:this.props.clearTeamList,
                            teamList:this.props.teamList,
                            fetchRoyaltyList:this.props.fetchRoyaltyList,
                            royaltyList:this.props.royaltyList
                        })
                    }
                </ReactCSSTransitionGroup>
                <section className="my-team-wrap">
                    <div className="my-team-item">
                        <span className="s1">本期收入</span>
                        <span className="s2" id="income">{team.income}元</span>
                    </div>
                    <div className="my-team-item">
                        <span className="s1">上期收入</span>
                        <span className="s2" id="prevIncome">{team.prevIncome}元</span>
                    </div>
                    <div className="my-team-item">
                        <span className="s1">累计收入</span>
                        <span className="s2" id="sumIncome">{team.sumIncome}元</span>
                    </div>
                </section>

                <section className="my-team-wrap">
                    <div className="my-team-item">
                        <Link className="m-item-a" to={`/myteam/teamlist`}>
                            <span className="s1">团队清单</span>
                            <span className="s2"><i className="icon icon-arrow-right"></i></span>
                        </Link>
                    </div>
                    <div className="my-team-item">
                        <Link className="m-item-a" to={`/myteam/royaltylist`}>
                            <span className="s1">提成清单</span>
                            <span className="s2"><i className="icon icon-arrow-right"></i></span>
                        </Link>
                    </div>
                </section>

            </section>
        )
    }
}

module.exports =  TeamPage
