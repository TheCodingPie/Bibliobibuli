const express = require("express");
var router = express.Router();

var  userModel = require("../models/user");
var  bookModel = require("../models/books");

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
    router.post('/returnImageNumber', async(req, res) => {
       

        userModel.find(req.body, (err, docs)=> 
                (err || docs.length==0 )? res.json("false") : res.send(docs[0])
        
        )
    });
   /* router.post('/addBook', async(req, res) => {
      
          let book=new bookModel(req.body);
        await user.findOneAndUpdate(
            { username:req.body.usernameOwner }, 
            { $push: { 
                      booksForSale:book 
                    } 
            })
        });*/
        router.post('/changeAdress', async(req, res) => {
      
            
         let rez= await userModel.findOneAndUpdate(
              { username:req.body.username }, 
              {
                        address:req.body.address
              });
             if(rez==null)
             res.json('false');
             else
             res.json('true');
          });

module.exports = router;
