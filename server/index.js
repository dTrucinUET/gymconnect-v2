const express = require("express");

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



const app = express();
const port = 8080;


app.use(express.json())


app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.use('/room_comment', roomCommentRoute);
app.use('/room', roomRoute);

app.use('/equipments', equipmentsRoute);
app.use('/equiment_comments', equipmentCommentsRoute);

app.use('/logs', logsRoute);

app.use('/permission', permissionRoute);
app.use('/roles', rolesRoute);
app.use('/role_permission', rolePermissionRoute);

app.use('/service', serviceRoute);
app.use('/service_comment', serviceCommentRoute);

app.use('/transaction', transactionRoute);
app.use('/transaction_logs', transactionLogsRoute);



app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
