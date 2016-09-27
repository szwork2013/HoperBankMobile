module.exports = {
    path: '/safe',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/SafePage'))
        })
    }
}
