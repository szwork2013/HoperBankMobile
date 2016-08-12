import React, { Component, PropTypes } from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { connect } from 'react-redux'
import { browserHistory,Link } from 'react-router'
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
      this.context.router.push({
        pathname: '/login',
        query: { backUrl: location.pathname }
      })
      return false;
    }

    /*url中有userId的话使用url的，没有的话使用store的userId，是为了给app端调用这页面用的*/
    props.fetchTeam(props.routeParams.userId || props.account.userId,()=>{
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
          <ReactCSSTransitionGroup component="div"
                                   transitionName="slide-right"
                                   transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {this.props.children}
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
TeamPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    team:state.team.preview,
    account:state.account
  }
}

export default connect(mapStateToProps, {
  fetchTeam
})(TeamPage)
