import React from 'react';
import firebase from '../../config/firebaseConfig'
import { FormControl, Button, Col, Image, Container, Row, Media, Modal,ListGroup,ListGroupItem } from 'react-bootstrap';
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import * as boo from '../../services/UserService'
var storageRef = firebase.storage().ref();

class BookDetailAuction extends React.Component {

  constructor(props) {
    super(props);
    console.log('hi')
    console.log(this.props.location.state)
      
    this.state = {
   
      user: this.props.location.state.user,
      idPhoto:this.props.location.state.item._id,
      item:this.props.location.state.item,
      image:{  name:"",
        nameAuthor:"",
        lastnameAuthor:"",
        usernameOwner:"",
        bids:[{price:0.0,usernameBidder:""}],
        startPrice:0.0,
        auctionEndDate:"",
        auctionEndTime:"",
        highestPrice:0.0,
        winner:"",
        aboutBook:"",
        yearPublishing:2020,
        publishing:"",
        urlImage:"",
        imageNumber:0,
     },
      imgUrl:""
      
    }
    
  }
  

  componentDidMount = async () => {
    let image=await bookService.returnBookAuction(this.state.idPhoto)
    console.log(image)
    await this.setState({image:image.data,imgUrl:image.data.urlImage});
    
  }
  printComments=()=>{
    let comments= this.state.image.bids.map((bid, index)=>{
        console.log(bid)
     return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" > <div className="col"> 
      <div><text>Ponudjivac : {bid.usernameBidder}</text> </div> 
       <div>Ponuda :<br/> {bid.price}</div>
      </div>  </ListGroup.Item>);  
     });
     return comments;
 }





 render() {
    return (
        <div style={{alignItems:'center',display:'flex',flexDirection:'column'}}>
        <div
        className=" mr-2 ml-2 mb-2 " 
        style={{display:'flex',alignItems:'center',flex:5}}
      >
        <Image
          width={300}
          height={300}
          className="ml-2 "
          src={this.state.image.urlImage}
          alt="radi"
          class="img-thumbnail"
        />
        <span></span>
        <span></span>
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <div style={{flex:2}}></div>
    <div style={{flex:2,display:'flex',flexDirection:'column',width:'100%'}}>
    <label style={{alignSelf:'center',color:'blue'}}>Broj ocena: {this.state.image.numOfReviews}</label>
    <label style={{alignSelf:'center',color:'blue'}}>Prosecna ocena: {this.state.image.averageReview}</label>
    </div>
    <div style={{flex:2}}></div>
        </div>
       
      </div>
      <div style={{flex:5,display:'flex',flexDirection:'column'}}>
    <label>{this.state.image.name}</label>
    <label>Autor : {this.state.image.nameAuthor +"  "+this.state.image.lastnameAuthor}</label>
    <label>Tip knjige : {this.state.image.bookType}</label>
    <label>Godina izdavanja : {this.state.image.yearPublishing}</label>
    <label>Izdavacka kuca : {this.state.image.publishing}</label>
    <label>Opis knjige : {this.state.image.description}</label>
    </div>
    <div style={{flex:2}}>
   
   


    </div>
    <div style={{flex:5}}>
      <h3>Ponude</h3>
      <ListGroup>
                    {this.printComments()}
                </ListGroup>
</div>

      </div>
    )
  }
}

export default  BookDetailAuction