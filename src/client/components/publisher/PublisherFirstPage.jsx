import React from 'react';
import { Navbar, Nav, NavDropdown,Button } from "react-bootstrap";
import * as publisherService from "../../services/PublisherService"
import * as bookService from "../../services/BookService";
import MyVerticallyCenteredModal from './CustomModal';
import ListGroup from 'react-bootstrap/ListGroup'


class PublisherFirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisher:this.props.location.state.publisher,
            orders:[] ,
            modalShow:false,
            successAdd:"",
            title:""
        }
    }

    componentDidMount=async()=>{
     await this.setState({orders: await publisherService.seeOrders(this.state.publisher.username)})

    }


    addBook=()=>{
        this.props.history.push({
            pathname: `/AddNewBook`,
        state: { publisher: this.state.publisher }
          });
     }
     seeMyBooks=()=>{
        this.props.history.push({
            pathname: `/SeeMyBooks`,
        state: { publisher: this.state.publisher }
          });
     }

     
     printOrders = () => {
      let findImages = this.state.orders.map((order, index) => {
        return (<ListGroup.Item key={ index} variant="info" className="mb-2 mt-1" style={{marginBottom:20}} >
        <div style={{display:"flex", flexDirection:"column",}}>
         <div class="text-secondary">  Naslov knjige: {order.nameBook}</div> 
         <div class="text-secondary">  Kolicina knjiga:{order.countBook}</div> 
         <div class="text-secondary">  Ukupna cena:{order.totalPrice}</div> 
         <div class="text-secondary">  Cena knjige pojedinacno:{order.price}</div> 
         <div class="text-secondary">  Username korisnika:{order.userUsername} </div>
         <div class="text-secondary">  Adresa korisnika:{order.userAddress} </div>
         <div class="text-secondary">  Email korisnika:{order.userEmail} </div>
          <div class="text-secondary"><Button className="ml-3 mr-2 mb-3" variant="warning" onClick={()=> this.deliveredOffer(order.idBook,order._id,order.countBook)}  >Isporuci</Button></div>
        </div>
           </ListGroup.Item>); 
      });
      return findImages;
    }
    deliveredOffer= async(idBook, idOrder, count)=>{
      var result= await bookService.sellNewBook(idBook, count, idOrder);
      (result)? 
      this.setState({modalShow:true, successAdd:"Uspesno ste isporucili narudzbinu.",
      title:"Narudzbina knjiga"}) 
      : this.setState({modalShow:true, successAdd:"Doslo je do greske, pokusajte ponovo.", title:"Narudzbina knjiga"}) ;
    }

    logOut=()=>{
      this.props.history.replace( {pathname:'/'});
      
    }


    render()
    {
        return(
          <div >
            <Navbar class="navbar navbar-expand-lg navbar-light bg-light">
            <Navbar.Brand>Bibliobibuli</Navbar.Brand>
            
        
              <Nav className="navbar">
                
            
             <Button variant="secondary" onClick={this.addBook}><h6>Dodaj knjigu</h6></Button> 
             <span class="navbar"></span>
                  <Button variant="secondary" onClick={this.seeMyBooks}><h6>Vidi knjige</h6></Button>
                  <span class="navbar"></span>
                   <Button variant="secondary" onClick={()=>this.logOut()}><h6>Odjavi se</h6></Button>
                
                  
              </Nav>
         
            </Navbar>
            <div style={{display:"flex", flexDirection:"row", flexGrow:1}}>
                 
                    <div style={{flexGrow:1}}></div>
                    <div style={{flexGrow:3}}>
                    <h1 style={{color:'#ff0178'}}>Pristigle porudzbine</h1>
                      <ListGroup>
                {this.printOrders()}
                </ListGroup>
                </div>
                <div style={{flexGrow:1}}></div>

              </div>

            <MyVerticallyCenteredModal
          show={this.state.modalShow}
          data={this.state.successAdd}
          title={this.state.title}
          onHide={() => {this.setState({ modalShow: false }); window.location.reload(true) ;}}
        />
            </div>
        )
    }


}
export default PublisherFirstPage
