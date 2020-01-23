import axios from 'axios';
import Fetchurl from './FetchUrl';


class BookService {
  constructor() {
    this.url =Fetchurl.url+'Book/';

  }
  

}

export default (new BookService());

