import axios from 'axios';
import Fetchurl from './FetchUrl';


class RequestService {
  constructor(url) {
    this.url =url;

  }
  
}

export default (new RequestService(Fetchurl.url));

