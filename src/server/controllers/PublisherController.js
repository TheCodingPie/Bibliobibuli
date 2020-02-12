const express = require("express");
var router = express.Router();

var publisherModel = require("../models/publisher");
var newBookModel= require('../models/newBook');
var ObjectID = require('mongodb').ObjectID;

router.post('/createPublisher', async(req, res) => {
       console.log(req.body)
        let publisher=new publisherModel(req.body);
      await publisher.save((err, result)=>{

            (err)? 
                (err.code==11000) ?  res.json("Korisnicko ime je zauzeto") :  res.json("greska na serveru") 
            : res.json("Uspesno ste kreirali profil");
  
     });
     
     
    });

   
    router.post('/SeeMyBooks',async(req,res)=>{
        let id=new ObjectID(req.body.id);
        publisherModel.findOne({_id:id},{booksForSale: 1, _id:0}, function(err, user) {
            (err)? res.json([]): (!user)? res.json([]) : res.json(user.booksForSale) ;
        });
    });
  
  



module.exports = router;
