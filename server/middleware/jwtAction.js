// import jwt from 'jsonwebtoken';
const jwt = require("jsonwebtoken")
require("dotenv").config();

const nonSecurePaths = ['/','/register', '/login', '/logout'];

const permissions = [
    "create room", "delete room", "update room", "read room",
    "create room_comment", "delete room_comment", "update room_comment", "read room_comment",
    "create equipments", "delete equipments", "update equipments", "read equipments",
    "create equipments_comment", "delete equipments_comment", "update equipments_comment", "read equipments_comment",
    "create logs", "delete logs", "update logs", "read logs",
    "create permission", "delete permission", "update permission", "read permission",
    "create roles", "delete roles", "update roles", "read roles",
    "create role_permission", "delete role_permission", "update role_permission", "read role_permission",
    "create service", "delete service", "update service", "read service",
    "create service_comment", "delete service_comment", "update service_comment", "read service_comment",
    "create transaction", "delete transaction", "update transaction", "read transaction",
    "create transaction_logs", "delete transaction_logs", "update transaction_logs", "read transaction_logs",
    "create user_room", "delete user_room", "update user_room", "read user_room",
    "create user", "delete user", "update user", "read user",
]


const roleRoutes = {
    '/room': ['admin', 'user', 'manager'],
    '/room/:id': ['admin', 'user', 'manager'],
    '/room_comment': ['admin', 'user', 'manager'],
    '/room_comment/:id': ['admin', 'user', 'manager'],
    '/equipments': ['admin', 'user', 'manager'],
    '/equipments/:id': ['admin', 'user', 'manager'],
    '/equipments_comment': ['admin', 'user', 'manager'],
    '/equipments_comment/:id': ['admin', 'user', 'manager'],
    '/users': ['admin'],
    '/users/:id': ['admin'],
    '/logs': ['admin', 'user', 'manager'],
    '/logs/:id': ['admin', 'user', 'manager'],
    '/permission': ['admin', 'user', 'manager'],
    '/permission/:id': ['admin', 'user', 'manager'],
    '/roles': ['admin', 'user', 'manager'],
    '/roles/:id': ['admin', 'user', 'manager'],
    '/role_permission': ['admin', 'user', 'manager'],
    '/role_permission/:id': ['admin', 'user', 'manager'],
    '/service': ['admin', 'user', 'manager'],
    '/service/:id': ['admin', 'user', 'manager'],
    '/service_comment': ['admin', 'user', 'manager'],
    '/service_comment/:id': ['admin', 'user', 'manager'],
    '/transaction': ['admin', 'user', 'manager'],
    '/transaction/:id': ['admin', 'user', 'manager'],
    'transaction_logs': ['admin', 'user', 'manager'],
    '/transaction_logs/:id': ['admin', 'user', 'manager'],
    '/user_room': ['admin', 'user', 'manager'],
    '/user_room/:id': ['admin', 'user', 'manager'],

}

const createJWT = (payload) => {
    let token = null;

    try {
        let key = process.env.JWT_SECRET;

        token = jwt.sign(
            payload,
            key,
            {
                expiresIn: process.env.JWT_EXPIRESIN
            }
        );

        // console.log("check token", token);
    } catch (error) {
        console.log("check error create jwt", error);
    }
    return token;

}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log("verify JWT error", error);

    }
    return decoded;

}
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
const checkUserJWT = (req, res, next) => {
    
    if (nonSecurePaths.includes(req.originalUrl)) return next();
    
    let cookies = req.cookies;
    let bearerToken = extractToken(req);

    console.log(bearerToken);
    
    if (cookies && cookies.access_token || bearerToken) {
        let token = cookies && cookies.access_token ? cookies.access_token : bearerToken;
        console.log('cookies', cookies);

        let decode = verifyJWT(token);
        if (decode) {
            req.user = decode;
            req.token = token;
            next();
        }
        else {
            console.log('here');

            return res.status(401).json({
                EM: 'Not authenticated the user',
                EC: -1,
                DT: ''
            })
        }
    }


    else {
        console.log("no cookie");
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })

    }
}
const checkUserPermission = (req, res, next) => {

    if (nonSecurePaths.includes(req.originalUrl)) return next();

    if (req.user) {
        let role = req.user.role_name;
        console.log(role);

        if (!role || role.length === 0) {
            return res.status(401).json({
                EM: "Unauthorized the user. Please login...",
                EC: -1,
                DT: ''
            })
        }
        let currentURL = req.originalUrl;
        console.log(currentURL);
        if(currentURL.includes('?')){
            currentURL = currentURL.split('?')[0];
        }
        
        const allowedAccess = roleRoutes[currentURL].includes(role)

        if (allowedAccess) {
            next();
        }
        else {
            return res.status(401).json({
                EM: "you don't have  permission to access this resource or perform this action.",
                EC: -1,
                DT: ''
            })
        }
    }
    else {
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        })
    }
}


module.exports = {
    createJWT,
    verifyJWT,
    checkUserJWT,
    checkUserPermission
}