const { Router } = require('express')

const hookController = require('../controllers/hookController')

const router = Router()

router.post('/', hookController.hookReceive)

module.exports = router