const express = require("express"); //Importe express
const app = express(); // Cela crée une application EXPRESS

app.use(express.json()); // Permet d'extraire le corp JSON de la requête

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
  console.log(req.body); // Affiche le corp en format json de la requête directement sur la console du serveur node
  res.status(201).json({
    message: "Objet créé !",
  });
});

app.use("/api/stuff", (req, res) => {
  // Réprésente l'endpoint (l'url demandé par le front end) comme pour le require pas besoin de mettre l'url complète juste l'URI suffit.
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff); // Retourne le tableau stuff
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
