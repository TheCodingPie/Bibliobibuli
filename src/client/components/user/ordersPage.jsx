import React from 'react';
import * as userService from "../../services/UserService";
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from 'react-bootstrap';



export default class OrdersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:this.props.location.state.user,
            orders:[]
        }}

        componentDidMount=async()=>
        {
            await this.setState({orders:await userService.seeOrders(this.state.user.username)});
        }

        viewOrder=async(id)=>{
            var result =await userService.viewOrder(id);
            if (result)  window.location.reload(true)
            else return;
        }

        printOrders=()=>{
            let orders= this.state.orders.map((order, index)=>{
             return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" >
            <div style={{display:"flex", flexDirection:"column"}}>
             <div>  Naslov knjige: {order.nameBook}</div> 
             <div>  Kolicina knjiga:{order.countBook}</div> 
             <div>  Ukupna cena:{order.totalPrice}</div> 
             <div>  Cena knjige pojedinacno:{order.price}</div> 
             <div>  Izdavac:{order.publisherUsername} </div> 
               <div>{(order.sendBook)? "Izdavac je poslao porucene knjige.":"Izdavac jos uvek nije poslao porucene knjige." }</div> 
              <div><Button onClick={()=>this.viewOrder(order._id)} >Obrisi obavestenje</Button>  </div> 
            </div>
               </ListGroup.Item>);  
             });
             return orders;
         }


        render()
        {
            return(
                <div style={{display:"flex", flexDirection:"row", flexGrow:1}}>
                 
                    <div style={{flexGrow:1}}></div>
                    <div style={{flexGrow:3}}>
                    <h4>Moje porudzbine</h4>
                      <ListGroup>
                {this.printOrders()}
                </ListGroup>
                </div>
                <div style={{flexGrow:1}}></div>

                </div>
            )
        }
    
    }