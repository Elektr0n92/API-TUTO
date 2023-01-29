const http = require("http"); // require permet d'importer modules NODE
const app = require("./app"); // Appel le fichier app.js
app.set("port", process.env.Port || 3000); // Défini quel port utiliser
const server = http.createServer(app);
server.listen(process.env.Port || 3000); // Ecoute le serveur sur le port 3000 ou alors sur le port par défault de la plateforme
