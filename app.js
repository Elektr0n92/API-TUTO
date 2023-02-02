const express = require("express"); //Importe express
const app = express(); // Cela crée une application EXPRESS
const mongoose = require("mongoose"); // Importe Mongoose
const { connection, hello } = require("./mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
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

app.use(express.json()); // Permet d'extraire le corp JSON de la requête

// Les Requêtes se trouvent dans le dossier 'routes'

app.use("/api/stuff", stuffRoutes); // route de base
app.use("/api/auth", userRoutes);

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
