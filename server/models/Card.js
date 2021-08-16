const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  cardName: { type: String, required: true },
  numCardOwned: { type: Number, default: 0 }
  // ADD location ex. Box 4
});

module.exports = mongoose.model("Card", CardSchema);
