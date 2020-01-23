const express = require("express");
const app = express();
let mongoose = require('mongoose');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();

});
app.use(express.json({ limit: '1mb' }));
app.listen(1234, () => console.log("Server is listening on port: 1234") );



mongoose.connect('mongodb://127.0.0.1:27017/Bibliobibuli', { useNewUrlParser: true,  useUnifiedTopology: true  })//ako je nema baza sam ce da je kreira


let userModel = require('./src/server/models/user')

app.post('/createUser', async (req, res)=> {
	
	console.log(req.body);
	let paki=new userModel(req.body);
	let savedDocument= await paki.save()//UPIS U BAZU NA KOJU SMO SE NAKACILI PREKO MONGOSE.CONNECT
	 console.log(savedDocument)
	res.json("Uspesno");
});


/*
let paki = new userModel({
  name: 'Paki',
  lastname:'Stojanovic'
})*/


