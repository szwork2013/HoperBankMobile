module.exports = {
    path: '/safe',
    component:require('./components/SafePage')
    /*getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/SafePage'))
        })
    }*/
}
