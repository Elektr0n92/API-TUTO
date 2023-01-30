const http = require("http"); // require permet d'importer modules NODE
const app = require("./app"); // Appel le fichier app.js

// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/* La fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. 
Elle est ensuite enregistrée dans le serveur */
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

const port = normalizePort(process.env.PORT || "3000"); // Ecoute le serveur sur le port 3000 ou alors sur le port par défault de la plateforme
app.set("port", port); // Défini quel port utiliser
server.listen(port);
