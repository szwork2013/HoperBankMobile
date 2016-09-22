import App from './containers/App'
import NoMatch from './containers/NoMatch'
export default {
    //onEnter: redirectHome,
    path: '/',
    component: App,
    IndexRedirect:{
        to:'/home'
    },
    indexRoute: {
        getComponent: (nextState, cb) => {
            // Only load if we're logged in

            return require.ensure([], (require) => {
                cb(null, require('./routes/Home'))
            })

        }
    },
    childRoutes: [
        require('./routes/Home'),
        require('./routes/Financial'),
        require('./routes/Borrow'),
        require('./routes/My'),
        require('./routes/Activity'),
        require('./routes/Team'),
        ...require('./routes/Auth'),
        {
            path:'*',
            component:NoMatch
        }
    ]
};