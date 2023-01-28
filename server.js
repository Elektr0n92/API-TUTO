const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Voici la première étape");
});

server.listen(process.env.Port || 3000);
