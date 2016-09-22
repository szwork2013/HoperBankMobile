module.exports = {
    path: '/activity',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/ActivityCenter'))
        })
    }
}
