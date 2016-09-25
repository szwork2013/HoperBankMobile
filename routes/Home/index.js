module.exports = {
    onLeave:(nextState,replace)=>{
        console.log(nextState)
    },
    path: '/home',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/HomePage'))
        })
    }
}
