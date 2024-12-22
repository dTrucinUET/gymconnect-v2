const { paymentService } = require('../service/paymentService')

const createPayment = async(req, res) => {
    const payment_body = req.body
    const payment_link = await paymentService(payment_body)
    if(payment_link){
        res.send(payment_link)
        return;
    }
    res.status(500).send({message: 'Payment failed'})
}

module.exports = {
    createPayment
}