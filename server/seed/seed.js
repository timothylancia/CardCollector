const connectDB = require("../util/db");
const Card = require("../models/Card");

const data = require("./data");

const seed = () => {
  connectDB()
    .then(() => {
      return Card.find().estimatedDocumentCount();
    })
    .then(cardCount => {
      if (cardCount > 0) {
        throw new Error("Card Collection is not empty.");
      }

      return Card.create(data);
    })
    .then(() => console.log("DB Seeded."))
    .catch(error => {
      console.log("Error while seeding database", error);
    })
    .finally(() => process.exit());
};

seed();
