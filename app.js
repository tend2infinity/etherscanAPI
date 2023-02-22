const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 5000
const KEYS = require('./Keys.js')
const api_resolver = require('./helper/API_resolver')

mongoose.connect(KEYS.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    // console.log("/ works!")
    res.send("it works!")
})

app.post('/getNormalTransactionsAPIResponse', (req, res) => {
    let account = req.body.account;
    let apiKey = KEYS.APIKEY;
    api_resolver.make_API_call('https://api.etherscan.io/api?module=account&action=txlist&address='+account+'&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey='+apiKey)
    .then(response => {
        res.json(response);
        console.log(res);
    })
    .catch(error => {
        res.send(error)
    })
})

app.listen(PORT, ()=> {
    console.log("app is running on",PORT)
})