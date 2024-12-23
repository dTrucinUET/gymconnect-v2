
const { registerService, hashUserPassWord, loginService, logoutService } = require('../service/authService')

const register = async (req, res) => {
    const payload = req.body
    const data = await registerService(payload)
    console.log(payload);

    if (!data) {
        return res.status(400).json({ message: 'Registration failed' })
    }
    return res.status(201).json({ message: "Registration successfully   ", data: data.user })
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