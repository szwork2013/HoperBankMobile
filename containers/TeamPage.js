import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { fetchTeam } from '../actions'
import RootLoading from '../components/RootLoading'
class TeamPage extends Component {
  constructor(props) {
    super(props)
    this.state={
      loaded:false
    }
  }
  componentWillMount() {

    const props = this.props;
    if(!props.account.userId){
      this.context.router.push('/login')
      return false;
    }
    props.fetchTeam(props.routeParams.userId,()=>{
      this.setState({loaded:true})
    })
  }
  componentDidMount(){

  }
  render() {
    const team = this.props.team;
    return (
        <section>
          <RootLoading display={!this.state.loaded} />
          <section className="my-team-wrap">
            <div className="my-team-item">
              <span className="s1">本期收入</span>
              <span className="s2" id="income">{team.income}</span>
            </div>
            <div className="my-team-item">
              <span className="s1">上期收入</span>
              <span className="s2" id="prevIncome">{team.prevIncome}</span>
            </div>
            <div className="my-team-item">
              <span className="s1">累计收入</span>
              <span className="s2" id="sumIncome">{team.sumIncome}</span>
            </div>
          </section>

          <section className="my-team-wrap">
            <div className="my-team-item">
              <a className="m-item-a" href="teamlist.html" id="teamListA">
                <span className="s1">团队清单</span>
                <span className="s2"><i className="icon icon-arrow-right"></i></span>
              </a>
            </div>
            <div className="my-team-item">
              <a className="m-item-a" href="royaltylist.html" id="royaltyListA">
                <span className="s1">提成清单</span>
                <span className="s2"><i className="icon icon-arrow-right"></i></span>
              </a>
            </div>
          </section>

        </section>
    )
  }
}
TeamPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    team:state.team,
    account:state.account
  }
}

export default connect(mapStateToProps, {
  fetchTeam
})(TeamPage)
