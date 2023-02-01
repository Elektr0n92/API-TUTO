const mongoose = require("mongoose");

//Schéma de données
const thingShema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", thingShema); // exporte le shema sous forme de modèle incluant le nom et la varaible du schèma
