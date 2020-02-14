import React, { Component } from "react";


import { Navbar, Nav, NavDropdown,Image ,Container, Badge,Dropdown } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import * as userService from '../../services/UserService'
import * as bookService from '../../services/BookService'
import { Button, Modal } from "react-bootstrap";
import SearchBar from "../searchBar";
import SearchBarAuction from "../searchBarAuction";
import moment from "moment";
import SearchNewBooks from "./SearchNewBooks";
import SearchPublisher from "./SearchPublisher";



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
      goBack:false,
      numberOfBoughtButNotSeenBooks:0,
      boughtButNotSeenBooks:[]
    };
  }
  componentDidMount=async()=>{
    if(this.props.location.state==undefined)return;
    let user=await userService.returnUser(this.state.user.username);
    let images=user.booksForSale.concat(user.booksToRent);
   let date=new Date();
   let parsedDate = "";
   parsedDate += date.getFullYear() +"/";
   let month = date.getMonth() + 1;
   parsedDate += month + "/";
   parsedDate += date.getDate();
   let booksWon=await bookService.findBookBought(parsedDate,user.username)
   console.log(booksWon)
    this.setState({user:user,images:images,boughtButNotSeenBooks:booksWon,numberOfBoughtButNotSeenBooks:booksWon.length})
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
   console.log(item);
   item._id=item.id
 this.props.history.push({
  pathname: `/bookDetailAuction`,
 state: { user: this.state.user,item:item , idPS:item._id}
});return}
item._id=item.id;
    this.props.history.push({
      pathname: `/bookDetailTrade`,
     state: { user: this.state.user,book_id:item._id,item:item }
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
  console.log(selected[0])
  this.props.history.push({
    pathname: `/bookDetailAuction`,
   state: { user: this.state.user,book_id:selected[0].id,item:selected[0], idPS:selected[0]._id }
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


  selectBook = async (selected) => {
    if (selected.length === 0) return;
  this.props.history.push({
    pathname: `/SeeNewBookUser`,
      state: { bookid: selected[0]._id , user:this.state.user }});

  }

  selectPublisher=async(selected)=>{
    if (selected.length === 0) return;
    this.props.history.push({
      pathname: `/PublisherProfile`,
        state: { username: selected[0].username, user:this.state.user }});

  }

  goToOrders=()=>{
    this.props.history.push({
      pathname: `/OrdersPage`,
      state: { user: this.state.user}
    });
  }
  logOut=()=>{
    this.props.history.replace( {pathname:'/'});
  }
    
  updateSeen=(book,index)=>{
    console.log(index)
    let result=bookService.updateSeenAuction(book._id);
    if(this.state.boughtButNotSeenBooks.length==1)
    this.setState({boughtButNotSeenBooks:[],numberOfBoughtButNotSeenBooks:0})
    else{
    let books=this.state.boughtButNotSeenBooks.splice(index, 1)
    this.setState({boughtButNotSeenBooks:books,
      numberOfBoughtButNotSeenBooks:books.length})
    }
    console.log(result);
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
                <SearchNewBooks selectBook={this.selectBook}></SearchNewBooks>
                <SearchPublisher selectPublisher={this.selectPublisher}></SearchPublisher>
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <NavDropdown.Item ><Button onClick={this.addBook}>Dodaj knjigu za razmenu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.changeAdress}>Promeni adresu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.addBookSale}>Dodaj knjigu za aukciju</Button></NavDropdown.Item>
                
                  <NavDropdown.Item ><Button onClick={this.addTopic}>Pokreni temu na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.seeTopics(true)}>Pregledaj najaktuelnije teme na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.seeTopics(false)}>Pregledaj sve teme na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.goToOrders()}>Vidi narudzbine</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.logOut()}>Odjavi se</Button></NavDropdown.Item>
                </NavDropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Nove knjige osvojene na aukciji
                    <Badge variant="light">{this.state.numberOfBoughtButNotSeenBooks}</Badge>
                    <span className="sr-only">unread messages</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {this.state.boughtButNotSeenBooks.map((x, index) => (
                      <Dropdown.Item
                        onClick={()=>this.updateSeen(x,index)}
                      >
                        Dobijena knjiga na aukciji {x.name} za cenu {x.highestBid.price}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <h1>{this.state.user.username}</h1>
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
      {(this.state.user.incomingRequests.length==0)? [] : <h3>Korisnici traze sledece knjige od Vas</h3>}
       
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
