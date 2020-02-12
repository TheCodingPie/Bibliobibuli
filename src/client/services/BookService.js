import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Book/';






const addBookExchange = async (name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description,yearPublishing,publishing,urlImage) => 
{
let dataToSend = {
    name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber,borrowedTo,description, yearPublishing,publishing,urlImage
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
  urlImage)=>
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
    urlImage}
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
export  {addBookExchange,addBookSale,searchBarTrade,searchBarAuction,returnBookTrade}
