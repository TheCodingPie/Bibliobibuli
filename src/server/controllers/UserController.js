const express = require("express");
var router = express.Router();

var  userModel = require("../models/user");

router.post('/createUser', async(req, res) => {
       
        let user=new userModel(req.body);
     await user.save((err, result)=>{
        (err)? 
            (err.code==11000) ?  res.json("Korisnicko ime je zauzeto") :  res.json("greska na serveru") 
        : res.json("Uspesno ste kreirali profil");
    
    
        });
    });

    router.post('/loginUser', async(req, res) => {
       
        console.log(req.body);

        userModel.find(req.body, (err, docs)=> 
           
                (err || docs.length==0 )? res.json("false") : res.send(docs[0])
        
        )
    });

module.exports = router;
