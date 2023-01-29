const express = require("express"); //Importe express
const app = express(); // Cela crée une application EXPRESS
app.use((req, res) => {
  res.json({ message: "Votre requête à bien été reçue !" }); // Pour chaque reqûete la réponse sera en format JSON
});
module.exports = app; //exporte app aux autres fichiers du projet
