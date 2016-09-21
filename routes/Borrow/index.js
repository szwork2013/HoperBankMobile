module.exports = {
    path: '/borrow',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/BorrowNavPage'))
        })
    }
}
