// LOGIQUE METIER
const Thing = require("../models/thing");

exports.createThing = (req, res) => {
  delete req.body._id; // supprime l'id de stuff car mongodb génère automatiquement un id
  const thing = new Thing({
    ...req.body, // Spread permet d'étendre un itérable
  }); // Affiche le corp en format json de la requête directement sur la console du serveur node
  thing
    .save() // Permet d'enregistrer l'objet dans la base
    .then(() => res.status(201).json({ message: "Objet crée !" }))
    .catch(() => res.status(400).json({ error: "error" })); // raccourcis error ne fonctionne pas
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res) => {
  Thing.findOne({ _id: req.params.id }) // Récupère l'id des paramètres de route
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllThings = (req, res) => {
  // Réprésente l'endpoint (l'url demandé par le front end) comme pour le require pas besoin de mettre l'url complète juste l'URI suffit.
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
