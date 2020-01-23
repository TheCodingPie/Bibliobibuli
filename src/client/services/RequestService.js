import axios from 'axios';
import Fetchurl from './FetchUrl';


class RequestService {
  constructor() {
    this.url =Fetchurl.url+'Request/';

  }
  
}

export default (new RequestService());

