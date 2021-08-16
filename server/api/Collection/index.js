const app = require("../../util/configureApi");
const Card = require("../../models/Card");
const connectDB = require("../../util/db");

app.post("*", (req, res) => {
  console.log(req.body);
  connectDB()
    .then(() => {
      return Card.create(req.body);
    })
    .then(cardItem => {
      res.status(200).json({
        result: cardItem
      });
    })
    .catch(error => {
      res.status(error.statusCode || 500).json({
        error: error.message
      });
    });
});

module.exports = app;
