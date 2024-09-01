const io = require('socket.io')({
  cors: {
    origin: ['http://localhost:3000']
  }
});

io.on('connection', socket => {

  socket.on("sendPhaseAndCounter", ({ counter, phase }) => {
    io.sockets.emit("receivePhaseAndCounter", { counter, phase });
  });

  socket.on("sendTeamInfos", (teamInfos) => {
      io.sockets.emit("receiveTeamInfos", teamInfos);
  });

  socket.on("sendCounter", (counter) => {
      io.sockets.emit("receiveCounter", counter);
  });

  socket.on("sendMatchInfo", (matchInfo) => {
      io.sockets.emit("receiveMatchInfo", matchInfo);
  });

  socket.on("sendPicksAndBans", (picksAndBans) => {
      io.sockets.emit("receivePicksAndBans", picksAndBans);
  });

  socket.on("sendStartTimer", () => {
    io.sockets.emit("receiveStartTimer");
  });

});

io.listen(5000); //server
console.log("listening on port ", 5000);