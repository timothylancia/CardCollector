const app = require("../../../util/configureApi");
const connectDB = require("../../../util/db");
const Card = require("../../../models/Card");

app.get("*", (req, res) => {
  connectDB()
    .then(() => {
      const name = req.query;
      console.log(req.query);

      if (!name) {
        throw new Error("No card found.");
      }

      return Card.findOne(req.query);
    })
    .then(response => {
      res.status(200).json({
        result: response
      });
    })
    .catch(error => {
      res.status(error.statusCode || 500).json({
        error: error.message
      });
    });
});

module.exports = app;
