import axios from 'axios';
import Fetchurl from './FetchUrl';
let url =Fetchurl.url+'Book/';






const addBook = async (name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber) => 
{
let dataToSend = {
    name, nameAuthor,lastnameAuthor,comments,numOfReviews,averageReview,usernameOwner,bookType,imageNumber
  };

  let res = await axios.post(url+'addBook/', dataToSend);
  console.log(res)
  //let data = await res.data;
  return res;

}
export  {addBook}