let mongoose = require('mongoose')


let bookAuctionSchema = new mongoose.Schema({
  name: String,
  nameAuthor:String,
  lastnameAuthor:String,
  usernameOwner:String,
  bookType:String,
  imageNumber:Number,
  startPrice:Number,
  bids:[{price:Number,usernameBidder:String}],
  auctionEndDate:String,
  auctionEndTime:String,
  highestPrice:Number,
  winner:String,
  aboutBook:String,
  yearPublishing:Number,
  publishing:String,
  urlImage:String


  

  
})

module.exports = mongoose.model('BookAuction', bookAuctionSchema)