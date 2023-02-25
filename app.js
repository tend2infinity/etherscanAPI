const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 5000;
const KEYS = require("./Keys.js");
const api_resolver = require("./helper/API_resolver");
require("./models/transaction");
const Transaction = mongoose.model("Transaction");
const client = require('prom-client');

//mongoDB setup
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

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Prometheus setup
const register = new client.Registry();
client.collectDefaultMetrics({register});

const httpRequestTimer = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
});

register.registerMetric(httpRequestTimer);


// routes

app.get("/", (req, res,next) => {
  // console.log("/ works!")
  res.send("it works!");
  next();
});

app.post("/getNormalTransactionsAPIResponse", (req, res,next) => {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
  let account = req.body.account;
  let apiKey = KEYS.APIKEY;
  if (!account || !apiKey) {
    res.status(422).json({ error: "apiKey or account id not valid" });
    res.end();
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
        res.status(400).send(response.message);
        res.end();
      }
      apiResponse = response;
      const transaction = new Transaction({
        address: account,
        transactions: response.result,
      });
      transaction
        .save()
        .then((result) => {
          res.status(200).json(result);
          end({ route, code: res.statusCode, method: req.method });
          next();
          res.end();
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("mongodb insert error!");
          res.end();
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
      res.end();
    });
});

//exposing metric to prometheus
app.get('/metrics', async (req, res) => {
  const end = httpRequestTimer.startTimer();
  const route = req.route.path;
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
  end({ route, code: res.statusCode, method: req.method });
});

app.listen(PORT, () => {
  console.log("app is running on", PORT);
});
