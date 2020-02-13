import React, { Component } from "react";


import { Navbar, Nav, NavDropdown,Image ,Container, Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import * as userService from '../../services/UserService'
import * as bookService from '../../services/BookService'
import { Button, Modal } from "react-bootstrap";
import SearchBar from "../searchBar";
import SearchBarAuction from "../searchBarAuction";



class FirstPageUser extends React.Component {
  constructor(props) {
    super(props);
    (this.props.location.state==undefined)?
    this.state = {
        goBack:true
      }:
    this.state = {
      user: this.props.location.state.user,
      images:[],
      goBack:false
    };
  }
  componentDidMount=async()=>{
    if(this.props.location.state==undefined)return;
    let user=await userService.returnUser(this.state.user.username);
    let images=user.booksForSale.concat(user.booksToRent);
    
   
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

  let p=false;
 this.state.user.booksForSale.forEach((x)=>{
   if(x.name==item.name)
   p=true;
   
 })
 if(p){
 this.props.history.push({
  pathname: `/bookDetailAuction`,
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

obradiIzborTrade=(selected)=>{
  console.log('sel')
console.log(selected[0])
this.props.history.push({
  pathname: `/bookDetailTrade`,
 state: { user: this.state.user,book_id:selected[0]._id,item:selected[0] }
});

}
 
obradiIzborAuction=(selected)=>{
  
  this.props.history.push({
    pathname: `/bookDetailAuction`,
   state: { user: this.state.user,book_id:selected[0].id,item:selected[0] }
  });
  
  }
  goToUserProfile=async(username)=>{
    let user=await userService.returnUser(username);
    console.log(user);
    this.props.history.push({
    pathname: `/UserProfile`,
  state: { user,userViewing:this.state.user}
  })};

  grantRequest=async(request)=>{
   
      let data={
        userId:this.state.user._id,
        requestId:request._id,
        ownerUsername:this.state.user.username

      }
   let res= await userService.grantRequest(data);
   if(res){
      await userService.notifyUser(request)
      await bookService.borrowBookTradeConfirmed(request.bookId,request.username)
  
  } else console.log('greska prilikom pozajmljivanja knjjige');

    window.location.reload(); 
  }

  printRequests=()=>{
    
    let requests= this.state.user.incomingRequests.map((request, index)=>{
        
     return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" > <div className="col"> 
      <h5><text>Korisnik koji trazi knjigu: <Button variant='info' onClick={()=>this.goToUserProfile(request.username)}>{request.username}</Button></text> </h5> 
       <h4>Knjiga: <Badge variant='dark'> {request.bookName}</Badge></h4>
       
       <div> <Button onClick={()=>this.grantRequest(request)}>Pozajmi knjigu</Button> </div> 
      </div>  </ListGroup.Item>);  
     });
     return requests;
 }

 printGrantedRequests=()=>{
   
  let requests= this.state.user.grantedRequests.map((request, index)=>{
      
   return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" > <div className="col"> 
    
     <h4> Knjiga: <Badge variant="primary">{request.bookName} </Badge> </h4>
     <h6>Vlasnik knjige: </h6>
     <h5><Badge variant="secondary" > {request.ownerUsername}  </Badge> </h5>
     <h6> Knjiga uskoro stize na Vasu adresu  </h6>
    </div>  </ListGroup.Item>);  
   });
   return requests;
}

  render() {
    return (
      (this.state.goBack)?(<label>Vratite se nazad</label>):
      (
      <div style={{flexGrow:1, flexShrink:1, flexBasis:1}}>
      <div className="w-100" style={{

       

      }} >
       
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Bibliobibuli</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <SearchBar obradiIzbor={this.obradiIzborTrade}></SearchBar>
                <SearchBarAuction obradiIzbor={this.obradiIzborAuction}></SearchBarAuction>
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <NavDropdown.Item ><Button onClick={this.addBook}>Dodaj knjigu za razmenu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.changeAdress}>Promeni adresu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.addBookSale}>Dodaj knjigu za aukciju</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.searchNewBooks}>Pretrazi nove knjige</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.addTopic}>Pokreni temu na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.seeTopics(true)}>Pregledaj najaktuelnije teme na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.seeTopics(false)}>Pregledaj sve teme na forumu</Button></NavDropdown.Item>
                </NavDropdown>
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <h3>{this.state.user.username}</h3>
        <label>
          {this.state.user.name} {this.state.user.lastname}
        </label><br/>
        <label>
          {this.state.user.address}
        </label>

        {(this.state.user.grantedRequests.length==0)? [] :<h2><Badge variant="success">Odobreni zahtevi za trampu</Badge ></h2>}
        <ListGroup style={{display:'flex',flexDirection:'column'}}>
              {this.printGrantedRequests()}
      </ListGroup>
      {(this.state.user.incomingRequests.length==0)? [] : <h3>Zahtevane knjige</h3>}
       
        <ListGroup style={{display:'flex',flexDirection:'column'}}>
              {this.printRequests()}
      </ListGroup>
        <h3>Vase knjige</h3>
        <Container style={{display:'flex',flexDirection:'row'}}>
         
          <div className="justify-content-center row">{this.printImages()}</div>
        </Container>
       

    
</div>)
     
     
    );
  }
}

export default FirstPageUser;

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
