const app = require("../../../util/configureApi");
const connectDB = require("../../../util/db");
const Card = require("../../../models/Card");

app.put("*", (req, res) => {
  connectDB()
    .then(() => {
      const { _id } = req.query;

      if (!_id) {
        throw new Error("No document id specified.");
      }

      return Card.findOneAndUpdate(
        { _id },
        {
          $inc: { numCardOwned: -1 }
        },
        {
          useFindAndModify: true,
          new: true
        }
      );
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
