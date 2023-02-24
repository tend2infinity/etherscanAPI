const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true 
    },
    transactions:[],
},{timestamps:true})
mongoose.model("Transaction",transactionSchema)