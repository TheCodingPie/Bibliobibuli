import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Publisher/';

const createPublisher = async (username, email , password, booksForSale) => 
{
let dataToSend = {
    username,  email , password, booksForSale,numOfReviews:0,averageReview:0, totalOfReviews:0
  };

  let res = await axios.post(url+'createPublisher/', dataToSend);
  let data = await res.data;
  return data;

}

const seeMyBooks= async(id)=>{
  let dataToSend = {
    id
  };
  let res = await axios.post(url+'SeeMyBooks/', dataToSend);
  let data = await res.data;
  return data;
}




export{
    createPublisher,seeMyBooks
   
}

