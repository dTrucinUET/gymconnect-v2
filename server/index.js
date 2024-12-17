const express = require("express");
const cookieParser = require("cookie-parser")

const {checkUserJWT, checkUserPermission} = require('./middleware/jwtAction.js')

const roomCommentRoute = require('./routes/room_comment_route.js')
const roomRoute = require('./routes/room_route.js')
const equipmentsRoute = require('./routes/equipment_route.js')
const equipmentCommentsRoute = require('./routes/equipment_comment_route.js')
const logsRoute = require('./routes/logs_route.js')
const permissionRoute = require('./routes/permission_route.js')
const rolesRoute = require('./routes/roles_route.js')
const rolePermissionRoute = require('./routes/role_permission_route.js')
const serviceRoute = require('./routes/services_route.js')
const serviceCommentRoute = require('./routes/services_comment_route.js')
const transactionLogsRoute = require('./routes/transaction_logs_route.js')
const transactionRoute = require('./routes/transaction_route.js')
const registerRoute = require('./routes/register_route.js')
const loginRoute = require('./routes/login_route.js')
const logoutroute = require('./routes/logout_route.js')
const userRoute = require('./routes/user_route.js')
const userRoomRoute = require('./routes/user_room_route.js')

const app = express();
const port = 8080;


app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/logout', logoutroute)

app.use('/room_comment', checkUserJWT, checkUserPermission, roomCommentRoute);
app.use('/room', checkUserJWT, checkUserPermission, roomRoute);

app.use('/equipments', checkUserJWT, checkUserPermission, equipmentsRoute);
app.use('/equiment_comments', checkUserJWT, checkUserPermission, equipmentCommentsRoute);

app.use('/logs', checkUserJWT, checkUserPermission, logsRoute);

app.use('/permission', checkUserJWT, checkUserPermission, permissionRoute);
app.use('/roles', checkUserJWT, checkUserPermission, rolesRoute);
app.use('/role_permission', checkUserJWT, checkUserPermission, rolePermissionRoute);

app.use('/service', checkUserJWT, checkUserPermission, serviceRoute);
app.use('/service_comment', checkUserJWT, checkUserPermission, serviceCommentRoute);

app.use('/transaction', checkUserJWT, checkUserPermission, transactionRoute);
app.use('/transaction_logs', checkUserJWT, checkUserPermission, transactionLogsRoute);

app.use('/users', checkUserJWT, checkUserPermission, userRoute)
app.use('/user_room', checkUserJWT, checkUserPermission, userRoomRoute)


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
