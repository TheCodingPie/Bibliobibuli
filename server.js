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

let userController = require("./src/server/controllers/UserController.js");
let bookController = require("./src/server/controllers/BookController.js");
let auctionController = require("./src/server/controllers/AuctionController.js");
let requestController = require("./src/server/controllers/RequestController");
let publisherController = require("./src/server/controllers/PublisherController");

app.use("/User", userController);

app.use("/Book", bookController);
/*app.use("/Auction", auctionController);
app.use("/Request", requestController);*/
app.use("/Publisher", publisherController);



