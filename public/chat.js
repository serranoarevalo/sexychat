const socket = io("/");

const username = document.getElementById("username");
const login = document.getElementById("login");
const form = document.getElementById("message");
const textarea = form.querySelector("textarea");
const submit = form.querySelector("button");
const messagesList = document.getElementById("messages-list");

form.style.display = "none";

login.addEventListener("click", () => {
  const name = username.value;
  username.style.display = "none";
  login.style.display = "none";
  socket.emit("setUsername", { name });
  form.style.display = "block";
});

submit.addEventListener("click", () => {
  const { value } = textarea;
  textarea.value = "";
  addMessage("You", value);
  socket.emit("newMessage", { message: value });
});

socket.on("new member", data => {
  const { name } = data;
  console.log(`${name} just joined!`);
});

socket.on("notifyMessage", data => {
  const { message, by } = data;
  addMessage(by, message);
});

const addMessage = (from, message) => {
  const newMessage = document.createElement("li");
  newMessage.innerText = `${from} said: ${message}`;
  messagesList.prepend(newMessage);
};
