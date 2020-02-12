import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Book/';



const addBookExchange = async (name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description,yearPublishing,publishing) => 
{
let dataToSend = {
    name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description, yearPublishing,publishing
  };

  let res = await axios.post(url+'addBook/', dataToSend);
  console.log(res)
  return res;

}

const addNewBook = async(usernamePublisher,name,nameAuthor, lastnameAuthor,bookType,description,price,countOfBooks,yearPublishing)=>{
  let dataToSend={
    usernamePublisher,name,nameAuthor, lastnameAuthor,bookType,description,price,countOfBooks,yearPublishing,
    numOfReviews:0,averageReview:0, totalOfReviews:0
  };

  let res = await axios.post(url+'AddNewBook/', dataToSend);
  return res.data;
  
}

const seeBook=async(id)=>{
  let dataToSend={id};
  let res = await axios.post(url+'SeeBook/', dataToSend);
  return res.data;
}

const addCommentNewBook=async (id, comment, username)=>
{
  let dataToSend={id,comment,username};
  let res = await axios.post(url+'AddCommentNewBook/', dataToSend);
  return res.data;
}

const rateNewBook=async (id,rating,userid)=>{
  let dataToSend={id,rating,userid};
  let res = await axios.post(url+'RateNewBook/', dataToSend);
  return res.data;
}

const canRateNewBook=async (id,userid)=>{
  let dataToSend={id,userid};
  let res = await axios.post(url+'CanRateNewBook/', dataToSend);
  return res.data;
}


const searchNewBooks=async (part)=>{
  let dataToSend={part};
  let res = await axios.post(url+'SearchNewBooks/', dataToSend);
  return res.data;
}


export  {addBookExchange,addNewBook,seeBook,addCommentNewBook,rateNewBook, canRateNewBook, searchNewBooks}