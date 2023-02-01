const express = require("express"); //Importe express
const app = express(); // Cela crée une application EXPRESS
app.use(express.json()); // Permet d'extraire le corp JSON de la requête
const mongoose = require("mongoose"); // Importe Mongoose
const { connection, hello } = require("./mongoose");
const Thing = require("./models/thing");
console.log(hello);
mongoose
  .set("strictQuery", true) // permet d'éviter l'erreur de dépréciation
  .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// CORS : permet l'utilisation de l'api sur deux serveurs (ports) différents (port 3000 et 4200)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * qui signifie que n'importe quel origine peut se connecter
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS" // Permet d'envoyer des requêtes avec des méthodes mentionnées
  );
  next();
});

// Requête Post
app.post("/api/stuff", (req, res) => {
  delete req.body._id; // supprime l'id de stuff car mongodb génère automatiquement un id
  const thing = new Thing({
    ...req.body, // Spread permet d'étendre un itérable
  }); // Affiche le corp en format json de la requête directement sur la console du serveur node
  thing
    .save() // Permet d'enregistrer l'objet dans la base
    .then(() => res.status(201).json({ message: "Objet crée !" }))
    .catch(() => res.status(400).json({ error: "error" })); // raccourcis error ne fonctionne pas
});

app.get("/api/stuff", (req, res) => {
  // Réprésente l'endpoint (l'url demandé par le front end) comme pour le require pas besoin de mettre l'url complète juste l'URI suffit.
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});
app.get("/api/stuff/:id", (req, res) => {
  Thing.findOne({ _id: req.params.id }) // Récupère l'id des paramètres de route
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

app.put("/api/stuff/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.use((req, res, next) => {
  // Ceci représente un middleware la fonction next permet de renvoyer vers un autre middleware
  console.log("requête bien reçue");
  next(); // ici on rapelle la fonction next
});

app.use((req, res, next) => {
  res.status(201); // Change le status de la réponse
  next();
});

app.use((req, res) => {
  res.json({ message: "Votre requête à bien été reçue !" }); // Pour chaque reqûete la réponse sera en format JSON
});

module.exports = app; //exporte app aux autres fichiers du projet
