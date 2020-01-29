const express = require("express");
var router = express.Router();

var  bookModel = require("../models/books");
var  userModel = require("../models/user");

    router.post('/addBook', async(req, res) => {
      
       let book=new bookModel(req.body);
     // let book=req.body;
     console.log(book);
      await userModel.findOneAndUpdate(
          { _id:"5e2e150b23029ec344ab310e"}, 
          { $push: { 
                    booksForSale:book
                  } 
          },(err, docs)=> 
          (err || docs.length==0 )? res.json("false") : res.send(docs[0]))
      });

 

module.exports = router;