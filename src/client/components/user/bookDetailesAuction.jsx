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
    console.log(this.state.user)
    console.log(this.state.item)
    
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
     return (<ListGroup.Item key={ index} variant="info" className="mb-2 mt-1" > <div className="col"> 
      <div class="text-secondary"><h6>Ponudjivac : {bid.usernameBidder}</h6> </div> 
       <div class="text-secondary"><h6>Ponuda :<br/> {bid.price}</h6></div>
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
   let p=false;
   this.state.user.booksForSale.forEach((x)=>{
     if(x._id==this.state.item._id)
     p=true;
   })
   if(p)
   {
    return ( <div style={{alignItems:'center',display:'flex',flexDirection:'column',width:'100%'}}>
    <div style={{alignItems:'center',display:'flex',flexDirection:'row',height:'50%',width:'100%',borderBottomStyle:'groove',borderBottomColor:'#868e96',borderBottomWidth:'3px',backgroundColor:'#e2dddd '}}>
    <div style={{display:'flex',flex:17}}></div>
    <div style={{display:'flex',flex:30,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    <div style={{display:'flex',flex:2}}></div>
    <div
    className=" mr-2 ml-2 mb-2 " 
    style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
  >
    
    <Image
      width={400}
      height={400}
      className="ml-2 "
      src={this.state.image.urlImage}
      alt="radi"
      class="img-thumbnail"
    />
    <span></span>
    <span></span>
    <h1> <Badge >{this.state.image.name}</Badge></h1>
    <h3><Badge variant='info'>Pocetna cena: {this.state.image.startPrice}</Badge></h3>
    </div>
   
  </div>

  
 <div style={{display:'flex',height:'100%',flex:47,alignContent:'flex-start',justifyContent:'flex-start',flexDirection:'column'}}>
<div style={{display:'flex',flex:2}}></div>
<div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Autor :</b> {this.state.image.nameAuthor +"  "+this.state.image.lastnameAuthor}</h3><br/></div>
<div style={{display:'flex',flex:2}}></div>
<div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Tip knjige:</b>  {this.state.image.bookType}</h3><br/></div>
<div style={{display:'flex',flex:2}}></div>
<div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Godina izdavanja : </b> {this.state.image.yearPublishing}</h3><br/></div>
<div style={{display:'flex',flex:2}}></div>
<div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Izdavacka kuca :</b>  {this.state.image.publishing}</h3><br/></div>
<div style={{display:'flex',flex:2}}></div>
<div style={{display:'flex',flex:3,wordBreak:'break-all'}} class="text-break"><h3><b class="text-secondary">Opis knjige:</b>{this.state.image.aboutBook}</h3><br/></div>
<div style={{display:'flex',flex:2}}></div>
<div style={{display:'flex',flex:3,wordBreak:'break-all'}} ><h3 style={{wordBreak:'break-all'}}><b class="text-secondary">O knjizi:</b>  {this.state.image.aboutBook}</h3><br/></div>
<div style={{display:'flex',flex:2}}></div>
</div>
<div style={{display:'flex',flex:0}}></div>
</div>
<div style={{flex:2}}>




</div>

    
<div style={{flex:5,height:'50%',flexDirection:'row',width:'100%'}}>
<div style={{display:'flex',flex:17}}></div>
<div style={{display:'flex',flex:60,width:'100%',flexDirection:'column'}}>
  <h1 class="text-secondary"><b>Ponude</b></h1>
  <ListGroup style={{display:'flex',flexDirection:'column-reverse'}} variant="info">
                {this.printComments()}
            </ListGroup>
</div>
<div style={{display:'flex',flex:14}}></div>
</div>


  
  </div>
    )
   }
   else{
    return (
      <div style={{alignItems:'center',display:'flex',flexDirection:'column',width:'100%'}}>
      <div style={{alignItems:'center',display:'flex',flexDirection:'row',height:'50%',width:'100%',borderBottomStyle:'groove',borderBottomColor:'#868e96',borderBottomWidth:'3px',backgroundColor:'#e2dddd '}}>
      <div style={{display:'flex',flex:17}}></div>
      <div style={{display:'flex',flex:30,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <div style={{display:'flex',flex:2}}></div>
      <div
      className=" mr-2 ml-2 mb-2 " 
      style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}
    >
      
      <Image
        width={400}
        height={400}
        className="ml-2 "
        src={this.state.image.urlImage}
        alt="radi"
        class="img-thumbnail"
      />
      <span></span>
      <span></span>
      <h1> <Badge >{this.state.image.name}</Badge></h1>
      <h3><Badge variant='info'>Pocetna cena: {this.state.image.startPrice}</Badge></h3>
      </div>
     
    </div>

    <div style={{display:'flex',flex:30,alignContent:'flex-start',justifyContent:'flex-start',flexDirection:'row'}}>
    <div style={{display:'flex',flex:30,alignContent:'flex-start',justifyContent:'flex-start',flexDirection:'column'}}>
   <div style={{display:'flex',height:'100%',flex:30,alignContent:'flex-start',justifyContent:'flex-start',flexDirection:'column'}}>
 <div style={{display:'flex',flex:2}}></div>
  <div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Autor :</b> {this.state.image.nameAuthor +"  "+this.state.image.lastnameAuthor}</h3></div>
  <div style={{display:'flex',flex:2}}></div>
  <div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Tip knjige:</b>  {this.state.image.bookType}</h3></div>
  <div style={{display:'flex',flex:2}}></div>
  <div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Godina izdavanja : </b> {this.state.image.yearPublishing}</h3></div>
  <div style={{display:'flex',flex:2}}></div>
  <div style={{display:'flex',flex:3}}><h3><b class="text-secondary">Izdavacka kuca :</b>  {this.state.image.publishing}</h3></div>
  <div style={{display:'flex',flex:2}}></div>
  <div style={{display:'flex',flex:3}} class="text-break"><h3><b class="text-secondary">Opis knjige:</b>{this.state.image.aboutBook}</h3></div>
  <div style={{display:'flex',flex:2}}></div>
  <div style={{display:'flex',flex:3}}><h3><b class="text-secondary">O knjizi:</b>  {this.state.image.aboutBook}</h3></div>
  <div style={{display:'flex',flex:2}}></div>
  <Button style={{backgroundColor:"#ff0178"}} onClick={this.handleShow} >
       <h2> Napravi Ponudu</h2>
      </Button>
      <label style={{color:this.state.canAddOrNotColor}}>{this.state.canAddOrNot}</label>
  </div>
  </div>
  </div>
  </div>
  <div style={{flex:2}}>
 
 


  </div>

      
  <div style={{flex:5,height:'50%',flexDirection:'row',width:'100%'}}>
  <div style={{display:'flex',flex:17}}></div>
  <div style={{display:'flex',flex:60,width:'100%',flexDirection:'column'}}>
    <h1 class="text-secondary"><b>Ponude</b></h1>
    <ListGroup style={{display:'flex',flexDirection:'column-reverse'}} variant="info">
                  {this.printComments()}
              </ListGroup>
  </div>
  <div style={{display:'flex',flex:14}}></div>
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