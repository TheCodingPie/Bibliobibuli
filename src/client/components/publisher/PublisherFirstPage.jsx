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
        return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" >
        <div style={{display:"flex", flexDirection:"column"}}>
         <div>  Naslov knjige: {order.nameBook}</div> 
         <div>  Kolicina knjiga:{order.countBook}</div> 
         <div>  Ukupna cena:{order.totalPrice}</div> 
         <div>  Cena knjige pojedinacno:{order.price}</div> 
         <div>  Username korisnika:{order.userUsername} </div>
         <div>  Adresa korisnika:{order.userAddress} </div>
         <div>  Email korisnika:{order.userEmail} </div>
          <div><Button className="ml-3 mr-2 mb-3" onClick={()=> this.deliveredOffer(order.idBook,order._id,order.countBook)}  >Isporuci</Button></div>
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
                
            
             <Button  onClick={this.addBook}>Dodaj knjigu</Button> 
             <span class="navbar"></span>
                  <Button onClick={this.seeMyBooks}>Vidi knjige</Button>
                  <span class="navbar"></span>
                   <Button onClick={()=>this.logOut()}>Odjavi se</Button>
                
                  
              </Nav>
         
            </Navbar>
            <div style={{display:"flex", flexDirection:"row", flexGrow:1}}>
                 
                    <div style={{flexGrow:1}}></div>
                    <div style={{flexGrow:3}}>
                    <h4>Pristigle porudzbine</h4>
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
