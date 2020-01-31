const express = require("express");
var router = express.Router();

var  bookModel = require("../models/books");
var  userModel = require("../models/user");

    router.post('/addBook', async(req, res) => {
      console.log("lalala")
       let book=new bookModel(req.body);
     await book.save();
     let rez=await userModel.updateOne(
      { username:book.usernameOwner}, 
      { $push: {
        booksToRent:{name:book.name,lastnameAuthor:book.lastnameAuthor,imageNumber:book.imageNumber,id:book._id}
      }
      })
       
    });

 

module.exports = router;