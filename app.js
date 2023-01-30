const express = require("express"); //Importe express
const app = express(); // Cela crée une application EXPRESS

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
