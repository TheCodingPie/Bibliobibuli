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
             return (<ListGroup.Item key={ index} variant="info" className="mb-2 mt-1" >
            <div style={{display:"flex", flexDirection:"column"}}>
             <div class="text-secondary">  Naslov knjige: {order.nameBook}</div> 
             <div class="text-secondary">  Kolicina knjiga:{order.countBook}</div> 
             <div class="text-secondary">  Ukupna cena:{order.totalPrice}</div> 
             <div class="text-secondary">  Cena knjige pojedinacno:{order.price}</div> 
             <div class="text-secondary">  Izdavac:{order.publisherUsername} </div> 
               <div class="text-secondary">{(order.sendBook)? "Izdavac je poslao porucene knjige.":"Izdavac jos uvek nije poslao porucene knjige." }</div> 
              <div class="text-secondary"><Button class="warning" onClick={()=>this.viewOrder(order._id)} >Obrisi obavestenje</Button>  </div> 
            </div>
               </ListGroup.Item>);  
             });
             return orders;
         }


        render()
        {
            return(
                <div style={{display:"flex", flexDirection:"row", flexGrow:1,backgroundColor:'lightgray',height:'100%'}}>
                 
                    <div style={{flexGrow:1}}></div>
                    <div style={{flexGrow:3}}>
                    <h1 style={{color:"#ff0178"}}><b>Moje porudzbine</b></h1>
                      <ListGroup>
                {this.printOrders()}
                </ListGroup>
                </div>
                <div style={{flexGrow:1}}></div>

                </div>
            )
        }
    
    }