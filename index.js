import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");

app.use(express.static("public"));

app.use(logger("tiny"));

app.get("/", (req, res) => res.render("index"));

const server = app.listen(PORT, () =>
  console.log(`Working! on http://localhost:${PORT}`)
);

const io = socketIO.listen(server);

io.on("connection", socket => {
  socket.on("setUsername", data => {
    const { name } = data;
    socket.name = name;
    socket.broadcast.emit("new member", { name });
  });

  socket.on("newMessage", data => {
    const { message } = data;
    socket.broadcast.emit("notifyMessage", { message, by: socket.name });
  });
});
