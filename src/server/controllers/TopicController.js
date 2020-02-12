const express = require("express");
var router = express.Router();

var  topicModel = require("../models/topic");


router.post('/addTopic', async(req, res) => {
      console.log(req.body);
    let topic=new topicModel(req.body);
    console.log(topic)
     await topic.save(err=>{
        (err)? 
                (err.code==11000) ?  res.json("Ovakva tema vec postoji") :  res.json("greska na serveru") 
            : res.json("Uspesno ste dodali temu");

     });
    
       
    });

    
router.get('/getTopics', async(req, res) => {
    
   await topicModel.find({},(err,topics)=>{
    (err)? res.json(500):res.json(topics)

   });
  
  
     
  });

  router.get('/getTrendingTopics', async(req, res) => {
    
   await topicModel.find({}).limit(5).sort('-seenBy').exec((err, docs)=> {
     
    (err) ? res.json(500) : res.json(docs);
  
  });

   
   
   
      
   });

  router.post('/addComment', async(req, res) => {
   
    let comment=
    { comment:req.body.comment, date: Date.now(), userWhoCommented:{username:req.body.username, id: req.body.userId} }
   
    
    console.log(req.body);
    console.log(comment)
    var r=topicModel.updateOne(
      { _id: req.body.topicId }, 
      { $push: { comments: comment } }, (error, success)=> {
         (error) ?
         res.json(500)
        :
            res.json('uspesno ste dodali komentar')
        
    }
      
  );
 
  
     
  });

  router.post('/incSeenBy', async(req, res) => {
   
   
    
    console.log(req.body);
  
    var r=topicModel.updateOne(
      req.body, 
      { $inc: { seenBy: 1 }}, (error, success)=> {
         (error) ?
         res.json(500)
        :
            res.json(200)
        
    }
      
  );
 
  
     
  });

 

module.exports = router;