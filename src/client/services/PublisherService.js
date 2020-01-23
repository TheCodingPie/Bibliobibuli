import axios from 'axios';
import Fetchurl from './FetchUrl';


class PublisherService {
  constructor() {
    this.url =Fetchurl.url+'Publisher/';

  }
  

}

export default (new PublisherService());

