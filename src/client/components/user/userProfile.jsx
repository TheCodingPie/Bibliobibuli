import React, { Component } from "react";


import { Navbar, Nav, NavDropdown,Image ,Container } from "react-bootstrap";

import * as userService from '../../services/UserService'
import * as bookService from '../../services/BookService'
import { Button, Modal } from "react-bootstrap";



export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    (this.props.location.state==undefined)?
    this.state = {
        goBack:true
      }:
    this.state = {
      user: this.props.location.state.user,
      userViewing:this.props.location.state.userViewing,
      images:[],
      goBack:false
    };
    console.log(this.state.userViewing)
    
  }
  componentDidMount=async()=>{
      if(this.state.goBack)return
    let user=await userService.returnUser(this.state.user.username);
    let images=user.booksForSale.concat(user.booksToRent);
    console.log(images);
    console.log(user);
    this.setState({user:user,images:images})
  }
componentWillMount=async ()=>{
 /* this.setState({
    images: await BaseService.getImagesForArtist(this.state.myData.username)
  });*/
}
 addBook=()=>{
    this.props.history.push({
        pathname: `/AddBook`,
    state: { user: this.state.user }
      });
 }
 addBookSale=()=>{
  this.props.history.push({
    pathname: `/AddBookSale`,
state: { user: this.state.user }
  });
 }
changeAdress=()=>{
  this.props.history.push({
    pathname: `/ChangeAdressUser`,
state: { user: this.state.user }
  });
}
bookDetailed=async(item)=>{
console.log(item);
console.log(this.state.user.booksForSale)
  let p=false;
 this.state.user.booksForSale.forEach((x)=>{
   if(x.name==item.name)
   p=true;
   
    
   
 })
 if(p){
 this.props.history.push({
  pathname: `/bookDetailSale`,
 state: { user: this.state.user,book_id:item.id,item:item }
});return}

    this.props.history.push({
      pathname: `/bookDetailTrade`,
     state: { user: this.state.user,book_id:item.id,item:item }
    });
  
}
printImages = () => {
  
  let findImages = this.state.images.map((item, index) => {
    return (
      <div
        key={index}
        className="d-flex  align-self-start flex-column mr-2 ml-2 mb-2 "
      >
        <a onClick={()=>this.bookDetailed(item)}>
        <Image
          width={300}
          height={300}
          className="align-self-start ml-2 "
          src={item.urlImage}
          alt="radi"
          class="img-thumbnail"
        />
        </a>
        <h4>{item.name}</h4>
      </div>
    );
  });
  return findImages;
};
searchNewBooks=()=>{
  this.props.history.push({
    pathname: `/SearchNewBooks`,
state: { user: this.state.user }
  });
}

addTopic=()=>{
  this.props.history.push({
    pathname: `/AddTopic`,
    state: { user: this.state.user }
  });
}

seeTopics=(trending)=>{
  this.props.history.push({
    pathname: `/SeeTopics`,
    state: { user: this.state.user,trending }
  });
}
 

  render() {
    
      
    return (
        (this.state.goBack)?(<label>Vratite se nazad</label>):
    (
      <div style={{flexGrow:1, flexShrink:1, flexBasis:1}}>
      
        <h3>{this.state.user.username}</h3>
        <label>
          {this.state.user.name} {this.state.user.lastname}
        </label>
        <label>
          {this.state.user.address} 
        </label>
        <h6>{this.state.user.email}</h6>
       

        <Container style={{display:'flex',flexDirection:'row'}}>
          <div className="justify-content-center row">{this.printImages()}</div>
        </Container>
       

    
</div>)
     
     
    );
  }
}


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="justify-content-center row">
        <text>Pobednici:</text>
      </div>
      <Modal.Body className="justify-content-center col ">
        <div className="justify-content-center row">{props.data}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zatvori</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal2(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="justify-content-center row">
        <text>Vasa prijava je prosla:</text>
      </div>
      <Modal.Body className="justify-content-center col ">
        <div className="justify-content-center row">{props.data}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zatvori</Button>
      </Modal.Footer>
    </Modal>
  );
}
