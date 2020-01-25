const express = require("express");
var router = express.Router();

var publisherModel = require("../models/publisher");

router.post('/createPublisher', async(req, res) => {
       console.log(req.body)
        let publisher=new publisherModel(req.body);
      await publisher.save((err, result)=>{

            (err)? 
                (err.code==11000) ?  res.json("Korisnicko ime je zauzeto") :  res.json("greska na serveru") 
            : res.json("Uspesno ste kreirali profil");
  
     });
     
     
    });

    router.post('/loginPublisher', async(req, res) => {
       
        console.log(req.body);

        publisherModel.find(req.body, (err, docs)=> 
           
                (err || docs.length==0 )? res.json("false") : res.send(docs[0])
        
        )
    });


module.exports = router;
