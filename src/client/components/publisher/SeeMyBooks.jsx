import React from 'react';
import firebase from '../../config/firebaseConfig'
import * as bookService from '../../services/BookService'
import * as publisherService from '../../services/PublisherService'
import ListGroup from 'react-bootstrap/ListGroup'
import { Button } from 'react-bootstrap';
import "./publishercss/addBook.css"




class SeeMyBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisher:this.props.location.state.publisher,
            books:[]        
        }
    }

   componentDidMount=async()=>{
    await this.setState({books :await publisherService.seeMyBooks(this.state.publisher._id)});
    }
    viewBookDetail=(id)=>{
        this.props.history.push({
            pathname: `/SeeBook`,
              state: { bookid: id , user:this.state.publisher }});
    }

    printBooks=()=>{
       let books= this.state.books.map((book, index)=>{
        return (<ListGroup.Item key={ index} variant="warning" className="mb-2 mt-1" > <div className="col"> <div><text>Naslov knjige: {book.name}</text> </div> <div>Zanr knjige: {book.bookType}</div>
         <div>Broj knjiga za prodaju: {book.bookNumber}  </div>  
         <div><Button onClick={() => this.viewBookDetail(book.id)} >Vidi detaljnije</Button>  </div> </div>  </ListGroup.Item>);  
        });
        return books;
    }
    render()
    {
        
        return(
            <div className="addNewBook">
                <div className="leftRight"></div>
                <div className="content2">
                    <h2>Moje knjige</h2>
                <ListGroup>
                {this.printBooks()}
                </ListGroup>
               
                </div>
                <div className="leftRight"></div>

            </div>
        )
    }

}
export default SeeMyBooks
