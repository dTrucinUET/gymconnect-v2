const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const { checkUserJWT, checkUserPermission } = require('./server/middleware/jwtAction.js');

const roomCommentRoute = require('./server/routes/room_comment_route.js');
const roomRoute = require('./server/routes/room_route.js');
const equipmentsRoute = require('./server/routes/equipment_route.js');
const equipmentCommentsRoute = require('./server/routes/equipment_comment_route.js');
const logsRoute = require('./server/routes/logs_route.js');
const permissionRoute = require('./server/routes/permission_route.js');
const rolesRoute = require('./server/routes/roles_route.js');
const rolePermissionRoute = require('./server/routes/role_permission_route.js');
const serviceRoute = require('./server/routes/services_route.js');
const serviceCommentRoute = require('./server/routes/services_comment_route.js');
const transactionLogsRoute = require('./server/routes/transaction_logs_route.js');
const transactionRoute = require('./server/routes/transaction_route.js');
const registerRoute = require('./server/routes/register_route.js');
const loginRoute = require('./server/routes/login_route.js');
const logoutroute = require('./server/routes/logout_route.js');
const userRoute = require('./server/routes/user_route.js');
const userRoomRoute = require('./server/routes/user_room_route.js');
const paymentRoute = require('./server/routes/embedded_payment_route.js');

const configCors = require('./server/config/cors.js');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
configCors(app);
app.use(express.json());
app.use(cookieParser());

// Define a router for `/api/v1` routes
const apiRouter = express.Router();

apiRouter.use('/register', registerRoute);
apiRouter.use('/login', loginRoute);
apiRouter.use('/logout', logoutroute);

apiRouter.use('/room', roomRoute);
apiRouter.use('/room_comment', roomCommentRoute);

apiRouter.use('/equipments', equipmentsRoute);
apiRouter.use('/equiment_comments', checkUserJWT, checkUserPermission, equipmentCommentsRoute);

apiRouter.use('/logs', checkUserJWT, checkUserPermission, logsRoute);

apiRouter.use('/permission', checkUserJWT, checkUserPermission, permissionRoute);
apiRouter.use('/roles', checkUserJWT, checkUserPermission, rolesRoute);
apiRouter.use('/role_permission', checkUserJWT, checkUserPermission, rolePermissionRoute);

apiRouter.use('/service', serviceRoute);
apiRouter.use('/service_comment', checkUserJWT, checkUserPermission, serviceCommentRoute);

apiRouter.use('/transaction', checkUserJWT, checkUserPermission, transactionRoute);
apiRouter.use('/transaction_logs', checkUserJWT, checkUserPermission, transactionLogsRoute);

apiRouter.use('/users', checkUserJWT, checkUserPermission, userRoute);
apiRouter.use('/user_room', checkUserJWT, checkUserPermission, userRoomRoute);

apiRouter.use('/payment', checkUserJWT, checkUserPermission, paymentRoute);

apiRouter.use('/Images', express.static(path.join(__dirname, 'Images')));

// Mount `apiRouter` on `/api/v1`
app.use('/api/v1', apiRouter);

// Serve static assets from the Next.js build (if in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", ".next", "static")));
  console.log("Serving production build...");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", ".next", "server", "pages", "index.html"));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`🌎  ==> API server running on PORT ${port}!`);
});
