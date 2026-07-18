import app from "./app.js";

const PORT = process.env.PORT || 5000;

/* app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
}); */
//--------------------------------------
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

server.keepAliveTimeout = 60000;
server.headersTimeout = 65000;

server.on("connection", () => {
  console.log("🟢 New Connection");
});

server.on("close", () => {
  console.log("🔴 Server Closed");
});
//--------------------------------------
