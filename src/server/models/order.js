let mongoose = require('mongoose')


let orderSchema = new mongoose.Schema({
   idUser:mongoose.Schema.Types.ObjectId,
   userUsername:String,
   publisherUsername:String,
   userAddress:String,
   price:Number,
   idBook:mongoose.Schema.Types.ObjectId,
   nameBook:String,
   countBook:Number,
   totalPrice:Number ,
   sendBook:Boolean,
   userEmail:String,
   seeUser:Boolean
})

module.exports = mongoose.model('Order', orderSchema);