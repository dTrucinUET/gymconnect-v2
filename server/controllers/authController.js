
const { registerService, hashUserPassWord, loginService, logoutService } = require('../service/authService')

const register = async (req, res) => {
    const payload = req.body
    const message = await registerService(payload)
    console.log(payload);

    const flag_message = message.slice(0, 5)
    if (flag_message === 'Error' || !message) {
        return res.status(400).json({ message: "Error registering user: " + message })
    }
    return res.status(201).json({ message: message })
}

const login = async (req, res) => {
    payload = req.body
    const username = payload.username
    const password = payload.password

    const { message, token, user_data } = await loginService(username, password)

    if (!token) {
        return res.status(400).json({ message: message })
    }

    res.cookie("token", token, {
        maxAge: 604800000,
        httpOnly: false,
    })
    return res.status(200).json({ message: message, user_data: user_data })

}

const logout = (req, res) => {
    const message = logoutService()
    res.cookie("token", "", { maxAge: 1 })
    return res.status(200).json({ message: message })
}

module.exports = {
    register,
    login,
    logout
}