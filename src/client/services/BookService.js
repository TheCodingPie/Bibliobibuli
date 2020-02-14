import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Book/';






const addBookExchange = async (name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description,yearPublishing,publishing,urlImage) => 
{
let dataToSend = {
    name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description, yearPublishing,publishing,urlImage, ratings:[],totalOfReviews:0,
  };

  let res = await axios.post(url+'addBook/', dataToSend);
  return res;

}
const addBookSale=async(  name,
  nameAuthor,
  lastnameAuthor,
  usernameOwner,
  bookType,
  imageNumber,
  startPrice,
  bids,
  auctionEndDate,
  auctionEndTime,
  highestPrice,
  winner,
  aboutBook,
  yearPublishing,
  publishing,
  urlImage,highestBid)=>
  {
    let dataToSend={name,
      nameAuthor,
      lastnameAuthor,
      usernameOwner,
      bookType,
      imageNumber,
      startPrice,
      bids,
      auctionEndDate,
      auctionEndTime,
      highestPrice,
      winner,
      aboutBook,
      yearPublishing,
      publishing,
    urlImage,highestBid}
      let res = await axios.post(url+'addBookAuction/', dataToSend);
  return res;
  }
  const searchBarTrade=async (name)=>
  {
    let dataToSend={name}
    let res=await axios.post(url+'searchBarTrade/', dataToSend)
    return res;
  }
  const searchBarAuction=async (name)=>
  {
    let dataToSend={name}
    let res=await axios.post(url+'searchBarAuction/', dataToSend)
    return res;
  }
  const returnBookTrade=async(_id)=>{
    let dataToSend={_id}
    let res=await axios.post(url+'returnBookTrade/', dataToSend)
    return res;
  }
  const returnBookAuction=async(_id)=>{
    let dataToSend={_id}
    let res=await axios.post(url+'returnBookAuction/', dataToSend)
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

const addCommentBook=async (id, comment, username)=>
{
  let dataToSend={id,comment,username};
  let res = await axios.post(url+'AddCommentBook/', dataToSend);
  return res.data;
}

const canRateBook=async (id,userid)=>{
  let dataToSend={id,userid};
  let res = await axios.post(url+'CanRateBook/', dataToSend);
  return res.data;
}

const rateBook=async (id,rating,userid)=>{
  let dataToSend={id,rating,userid};
  let res = await axios.post(url+'RateBook/', dataToSend);
  return res.data;
}

const sellNewBook=async (id,count,orderId)=>{
  let dataToSend={id,count,orderId};
  let res = await axios.post(url+'SellNewBook/', dataToSend);
  return res.data;
}


//export  {addBookExchange,addBookSale,searchBarTrade,searchBarAuction,returnBookTrade}
const borrowBookTrade=async(data)=>
{



  let res = await axios.post(url+'BorrowBookTrade/', data);
  return res.data;
}


const borrowBookTradeConfirmed=async(_id,username)=>
{

  let dataToSend={_id,username};

  let res = await axios.post(url+'BorrowBookTradeConfirmed/', dataToSend);
  return res.data;
}

const freeBook=async(bookId)=>{
  let dataToSend={_id:bookId};
  let res = await axios.post(url+'FreeBook/', dataToSend);
  return res.data;

}
const addBid=async(_id,price,usernameBidder)=>{
  let dataToSend={_id:_id,price:price,usernameBidder:usernameBidder};
  let res = await axios.post(url+'addBidAuction/', dataToSend);
  return res.data;
}
const findBookBought=async(date,usernameBidder)=>{
  let dataToSend={date:date,usernameBidder:usernameBidder};
  let res = await axios.post(url+'findBookBought/', dataToSend);
  console.log(res.data)
  return res.data;
}


export  {addBookExchange,findBookBought,addNewBook,seeBook,addCommentNewBook,
  rateNewBook, canRateNewBook, searchNewBooks ,addBookSale,searchBarTrade,
  addBid,
  searchBarAuction,returnBookTrade,returnBookAuction,borrowBookTrade,freeBook,borrowBookTradeConfirmed,  addCommentBook, canRateBook, rateBook, sellNewBook}

  //export  {addBookExchange,addNewBook,seeBook,addCommentNewBook,rateNewBook, canRateNewBook, searchNewBooks 
   // ,addBookSale,searchBarTrade,searchBarAuction,
   // returnBookTrade,returnBookAuction}
