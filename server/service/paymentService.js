const PAYOS = require('@payos/node')


const payOs = new PAYOS(
    process.env.PAYOS_CLIENT_ID,
    process.env.PAYOS_API_KEY,
    process.env.PAYOS_CHECKSUM_KEY
)
const DOMAIN = 'http://localhost:3000'


const paymentService = async(paymentInfo) => {
    const paymentBody = {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: paymentInfo.amount,
        description: paymentInfo.description,
        item: paymentInfo.item,
        returnUrl: `${DOMAIN}`,
        cancelUrl: `${DOMAIN}`,
    }


    try {
        const paymentLinkResponse = await payOs.createPaymentLink(paymentBody);
        return paymentLinkResponse;
      } catch (error) {
        console.error(error);
        throw new Error(err)
      }

}

module.exports = {
    paymentService
}