// import jwt from 'jsonwebtoken';

const jwt = require("jsonwebtoken")
require("dotenv").config();

const nonSecurePaths = ['/', '/register', '/login', '/logout'];

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
        let key = process.env.JWT_SECRET || 'trucxinhlunglinh';

        token = jwt.sign(
            payload,
            key,
            {
                expiresIn: process.env.JWT_EXPIRESIN || 3600000
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
    console.log('checkUserJWT');

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
// const checkUserPermission = (req, res, next) => {

//     if (nonSecurePaths.includes(req.originalUrl)) return next();

//     if (req.user) {
//         let role = req.user.role_name;
//         console.log(role);

//         if (!role || role.length === 0) {
//             return res.status(401).json({
//                 EM: "Unauthorized the user. Please login...",
//                 EC: -1,
//                 DT: ''
//             })
//         }
//         let currentURL = req.originalUrl;
//         console.log(currentURL);
//         if (currentURL.includes('?')) {
//             currentURL = currentURL.split('?')[0];
//         }

//         const allowedAccess = roleRoutes[currentURL].includes(role)

//         if (allowedAccess) {
//             next();
//         }
//         else {
//             return res.status(401).json({
//                 EM: "you don't have  permission to access this resource or perform this action.",
//                 EC: -1,
//                 DT: ''
//             })
//         }
//     }
//     else {
//         return res.status(401).json({
//             EM: 'Not authenticated the user',
//             EC: -1,
//             DT: ''
//         })
//     }
// }

const checkUserPermission = (req, res, next) => {
    console.log("nonSecurePaths:", nonSecurePaths);
    console.log("req.originalUrl", req.originalUrl);
    console.log('hit permissioncheck');

    // If URL is in non-secure paths, skip permission check
    if (nonSecurePaths.includes(req.originalUrl)) {
        console.log('nonSecurePaths matched');
        return next();
    }

    // Check if the user is authenticated
    if (req.user) {
        let role = req.user.role_name;
        console.log("Role:", role);

        if (!role || role.length === 0) {
            console.log('not authen');

            return res.status(401).json({
                EM: "Unauthorized the user. Please login...",
                EC: -1,
                DT: ''
            });
        }

        let currentURL = req.originalUrl;
        console.log("currentURL:", currentURL);

        if (currentURL.includes('?')) {
            currentURL = currentURL.split('?')[0];
            console.log('hit currentURL split');

        }
        console.log('URL after removing query:', currentURL);

        const baseURL = currentURL.split('/')[1];

        console.log("Base URL:", baseURL);

        // Check if the route is allowed for the user's role
        if (roleRoutes[`/${baseURL}`] && roleRoutes[`/${baseURL}`].includes(role)) {
            console.log('Role has permission for this route.');
            return next();
        } else {
            console.log('Role does NOT have permission for this route.');
            return res.status(401).json({
                EM: "You don't have permission to access this resource or perform this action.",
                EC: -1,
                DT: ''
            });
        }
    } else {
        console.log('User is not authenticated.');
        return res.status(401).json({
            EM: 'Not authenticated the user',
            EC: -1,
            DT: ''
        });
    }
    console.log('hit end');
};
module.exports = {
    createJWT,
    verifyJWT,
    checkUserJWT,
    checkUserPermission
}