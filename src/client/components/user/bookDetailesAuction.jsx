import React from 'react';
import firebase from '../../config/firebaseConfig'
import { FormControl, Button, Col, Image, Container, Row, Media, Modal,ListGroup,ListGroupItem,Badge } from 'react-bootstrap';
import moment from "moment";
import * as bookService from '../../services/BookService'
import * as userService from '../../services/UserService'
import * as boo from '../../services/UserService'
var storageRef = firebase.storage().ref();

class BookDetailAuction extends React.Component {

  constructor(props) {
    super(props);
   
      
    this.state = {
    
      user: this.props.location.state.user,
      idPhoto:this.props.location.state.item._id,
      item:this.props.location.state.item,
      id:this.props.location.state.idPS,
      image:{  name:"",
        nameAuthor:"",
        lastnameAuthor:"",
        usernameOwner:"",
        bids:[{price:0.0,usernameBidder:""}],
        highestBid:{price:0,usernameBidder:"",seen:false},
        startPrice:0.0,
        auctionEndDate:"",
        auctionEndTime:"",
        winner:"",
        aboutBook:"",
        yearPublishing:2020,
        publishing:"",
        urlImage:"",
        imageNumber:0,
        _id:null
     },
      imgUrl:"",
      showBid:false,
      bidMoney:0,
      warning:"",
      canAddOrNot:"",
      canAddOrNotColor:'white'
      
    }
    console.log(this.props.location.state.item._id)
    
  }
  

  componentDidMount = async () => {
  //  let image=await bookService.returnBookAuction(this.state.item._id)
  let image=await bookService.returnBookAuction(this.state.id)
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
 handleShow=()=>{
   
   let date= new Date();
   let parsedDate = "";
   parsedDate += date.getFullYear() +"/";
   let month = date.getMonth() + 1;
   parsedDate += month + "/";
   parsedDate += date.getDate();
  
  console.log(this.state.image.auctionEndTime)
   console.log(parsedDate)
   if(this.state.image.auctionEndDate>parsedDate
   ||(this.state.image.auctionEndDate==parsedDate && moment().format("HH:mm")<this.state.image.auctionEndTime))
   this.setState({showBid:true});
   else{
    this.setState({showBid:false,canAddOrNot:"Ponuda je istekla",canAddOrNotColor:'red'})
   }
 }
 handleClose=()=>{
   this.setState({showBid:false})
 }
 handleChangeBidMoney=(e)=>{
  this.setState({bidMoney:e.target.value,warning:""})
}
handlePonuda=()=>{

  
  if(this.state.image.bids.length==0)
  {
       if(parseInt(this.state.bidMoney)>parseInt(this.state.image.startPrice))
       {

       bookService.addBid(this.state.image._id,this.state.bidMoney,this.state.user.username)
       window.location.reload(true);
        this.handleClose();
       }
       else{
        this.setState({warning:"Ovo je manje od najvise ponudjenog novca ili odustanite ili ponudite vecu sumu novca"})
        this.setState({showBid:true})
       }
  }
  else
  {
    if(this.state.bidMoney>this.state.image.bids[this.state.image.bids.length-1].price)
    {
      bookService.addBid(this.state.image._id,this.state.bidMoney,this.state.user.username)
      window.location.reload(true);
      this.handleClose();
    }
    else{
      this.setState({warning:"Ovo je manje od najvise ponudjenog novca ili odustanite ili ponudite vecu sumu novca"})
      this.setState({showBid:true})
    }
  }
  
}




 render() {
   if(this.state.user.username==this.state.item.usernameOwner)
   {
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
    
   
    </div>
    <div style={{flex:2}}></div>
        </div>
       
      </div>
      <div style={{flex:5,display:'flex',flexDirection:'column'}}>
      <h3> <Badge variant='info'>Pocetna cena: {this.state.image.startPrice}</Badge></h3>
    <label>{this.state.image.name}</label>
    <label>Autor : {this.state.image.nameAuthor +"  "+this.state.image.lastnameAuthor}</label>
    <label>Tip knjige : {this.state.image.bookType}</label>
    <label>Godina izdavanja : {this.state.image.yearPublishing}</label>
    <label>Izdavacka kuca : {this.state.image.publishing}</label>
    <label>Opis knjige : {this.state.image.description}</label>
    <label>O knjizi: {this.state.image.aboutBook}</label>
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
   else{
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
  
  <div style={{flex:2}}></div>
      </div>
     
    </div>
    <h3><Badge variant='info'>Pocetna cena: {this.state.image.startPrice}</Badge></h3>
    <div style={{flex:5,display:'flex',flexDirection:'column'}}>
 <h1> <Badge >{this.state.image.name}</Badge></h1>
  <label>Autor : {this.state.image.nameAuthor +"  "+this.state.image.lastnameAuthor}</label>
  <label>Tip knjige : {this.state.image.bookType}</label>
  <label>Godina izdavanja : {this.state.image.yearPublishing}</label>
  <label>Izdavacka kuca : {this.state.image.publishing}</label>
  <label>Opis knjige : {this.state.image.aboutBook}</label>
  <label>O knjizi: {this.state.image.aboutBook}</label>
  </div>
  <div style={{flex:2}}>
 
 


  </div>
  <Button variant="primary" onClick={this.handleShow} >
        Ponudi
      </Button>
      <label style={{color:this.state.canAddOrNotColor}}>{this.state.canAddOrNot}</label>
  <div style={{flex:5}}>
    <h3>Ponude</h3>
    <ListGroup style={{display:'flex',flexDirection:'column-reverse'}}>
                  {this.printComments()}
              </ListGroup>
</div>


      <Modal show={this.state.showBid} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ponuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>Napravi ponudu ,moguca je ponuda samo veca od trenutno najvece
        <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite vasu ponudu"
                        value={this.state.bidMoney}
                        onChange={this.handleChangeBidMoney.bind(this)}
                        ></input>
   <label style={{color:'red'}}>{this.state.warning}</label>

        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handlePonuda}>
            Ponudi
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Otkazati
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
   }
  }
}

export default  BookDetailAuction