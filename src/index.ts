import express from "express";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import exfileUpload from "express-fileupload";
import ee from "./event/event";
import CONFIG from "./config";
import routes from "./routes/routes";
import Token from "./utils/jwt";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use("/media", express.static(path.join(__dirname, "./uploads")));
app.use(cors());
app.use(express.json());
app.use(exfileUpload());
app.use("/v1", routes);

let onlineUsers: any[] = [];

io.on("connection", (socket: Socket): any => {
  const { token }: any = socket.handshake.headers;

  if (!token) return;

  const { userId }: any = Token.verify(token);

  const newUser = {
    userId,
    userSocketId: socket.id,
  };

  onlineUsers.push(newUser);

  ee.on("CREATED_MESSAGE", (message) => {
    const onlineUser = onlineUsers.find(
      (user) => user.userId === message.user_id
    );

    if (onlineUsers) {
      socket.to(onlineUser.userId).emit("CREATED_MESSAGE", message);
    }
  });

  ee.on("DELETED_MESSAGE", (message) => {
    const onlineUser = onlineUsers.find(
      (user) => user.userId === message.user_id
    );

    if (onlineUsers) {
      socket.to(onlineUser.userId).emit("DELETED_MESSAGE", message);
    }
  });

  ee.on("CREATED_USER", (newUser) => {
    socket.broadcast.emit("CREATED_USER", newUser);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.userSocketId !== socket.id);
  });
});

server.listen(CONFIG.PORT, () => {
  console.log(CONFIG.PORT);
});
