const {registerService} = require('../service/authService')

const register = (req, res) => {
    payload = res.body
    registerService(payload)
}

module.exports = {
    register
}