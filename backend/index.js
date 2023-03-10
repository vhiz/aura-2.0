const express = require("express");
const app = express();
const helmet = require("helmet");
require("dotenv/config");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const commentRoute = require("./routes/comments");
const likesRoute = require("./routes/likes");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const relationshipRoute = require("./routes/relationships");
const storyRoute = require("./routes/stories");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/messages");
const cors = require("cors");
const CookieParser = require("cookie-parser");
const multer = require("multer");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS,
  },
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS,
  })
);
app.use(CookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/auth", authRoute);
app.use("/comments", commentRoute);
app.use("/likes", likesRoute);
app.use("/posts", postsRoute);
app.use("/users", userRoute);
app.use("/relationships", relationshipRoute);
app.use("/story", storyRoute);
app.use("/conversations", conversationRoute);
app.use("/message", messageRoute);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOURI, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});

//socket io connection

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//get users not online
io.on("connection", (socket) => {
  console.log("user Connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, img }) => {
    const user = getUser(receiverId);
    if (!user) {
      const user = receiverId;
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const Port = process.env.PORT || 3001;

httpServer.listen(Port, () => {
  console.log(`connected at Port ${Port}`);
});
