import App from './containers/App'
import NoMatch from './containers/NoMatch'
export default {
    //onEnter: redirectHome,
    path: '/',
    component: App,
    indexRoute: { onEnter: (nextState, replace) => replace('/home') },
    childRoutes: [
        require('./routes/Home'),
        require('./routes/Financial'),
        require('./routes/Borrow'),
        require('./routes/My'),
        require('./routes/Activity'),
        require('./routes/Team'),
        require('./routes/Discover'),
        ...require('./routes/Auth'),
        require('./routes/Safe'),
        {
            path:'*',
            component:NoMatch
        }
    ]
};