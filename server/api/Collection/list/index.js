const app = require("../../../util/configureApi");
const connectDB = require("../../../util/db");
const Card = require("../../../models/Card");

app.get("*", (req, res) => {
  connectDB()
    .then(() => Card.find())
    .then(cardItems => {
      res.status(200).json({
        result: cardItems
      });
    })
    .catch(error => {
      res.status(error.statusCode || 500).json({
        error: error.message
      });
    });
});

module.exports = app;
