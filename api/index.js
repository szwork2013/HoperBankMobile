console.log('It is '+process.env.NODE_ENV+'.')
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./api.prod')
} else {
    module.exports = require('./api.test')
}
