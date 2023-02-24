const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 5000;
const KEYS = require("./Keys.js");
const api_resolver = require("./helper/API_resolver");
require("./models/transaction");
const Transaction = mongoose.model("Transaction");

mongoose.connect(KEYS.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeahhh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // console.log("/ works!")
  res.send("it works!");
});

app.post("/getNormalTransactionsAPIResponse", (req, res) => {
  let account = req.body.account;
  let apiKey = KEYS.APIKEY;
  if (!account || !apiKey) {
    return res.status(422).json({ error: "apiKey or account id not valid" });
  }
  let apiResponse = null;
  api_resolver
    .make_API_call(
      "https://api.etherscan.io/api?module=account&action=txlist&address=" +
        account +
        "&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=" +
        apiKey
    )
    .then((response) => {
      if (response.status == "0") {
        res.status(400).send(response.message).end();
      }
      console.log(response.result.length);
      apiResponse = response;
      const transaction = new Transaction({
        address: account,
        transactions: response.result,
      });
      transaction
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("mongodb insert error!");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

app.listen(PORT, () => {
  console.log("app is running on", PORT);
});
