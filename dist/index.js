"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var event_1 = __importDefault(require("./event/event"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes/routes"));
var jwt_1 = __importDefault(require("./utils/jwt"));
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server);
app.use("/media", express_1.default.static(path_1.default.join(__dirname, "./uploads")));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use("/v1", routes_1.default);
var onlineUsers = [];
io.on("connection", function (socket) {
    var token = socket.handshake.headers.token;
    if (!token)
        return;
    var userId = jwt_1.default.verify(token).userId;
    var newUser = {
        userId: userId,
        userSocketId: socket.id,
    };
    onlineUsers.push(newUser);
    event_1.default.on("CREATED_MESSAGE", function (message) {
        var onlineUser = onlineUsers.find(function (user) { return user.userId === message.user_id; });
        if (onlineUsers) {
            socket.to(onlineUser.userId).emit("CREATED_MESSAGE", message);
        }
    });
    event_1.default.on("DELETED_MESSAGE", function (message) {
        var onlineUser = onlineUsers.find(function (user) { return user.userId === message.user_id; });
        if (onlineUsers) {
            socket.to(onlineUser.userId).emit("DELETED_MESSAGE", message);
        }
    });
    event_1.default.on("CREATED_USER", function (newUser) {
        socket.broadcast.emit("CREATED_USER", newUser);
    });
    socket.on("disconnect", function () {
        onlineUsers = onlineUsers.filter(function (user) { return user.userSocketId !== socket.id; });
    });
});
server.listen(config_1.default.PORT, function () {
    console.log(config_1.default.PORT);
});
