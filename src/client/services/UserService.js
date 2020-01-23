
import axios from 'axios';
import Fetchurl from './FetchUrl';


class UserService {
  constructor() {
    this.url =Fetchurl.url+'User/';
    
  }

  createUser = async (username, name, lastname, address, email , password, grade, numOfBorrowedBooks, incomingRequests,
     madeRequests,booksForSale, booksToRent) => {

    let dataToSend = {
      username, name, lastname, address, email , password, grade, numOfBorrowedBooks, incomingRequests,
        madeRequests,booksForSale, booksToRent
    };
    console.log(dataToSend)

    let res = await axios.post(this.url + 'createUser/', dataToSend);
    let data = await res.data;
    return data;

  }


}

export default (new UserService());

