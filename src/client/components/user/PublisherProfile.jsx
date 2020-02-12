import React from 'react';
import * as bookService from '../../services/BookService'

export default class PublisherProfile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
           publisherid:this.props.location.state.publisherid,
           user:this.props.location.state.user,
           publisher:{username:"",email:"", booksForSale:[], averageReview:0, totalOfReview:0}
        }
    }
    
    render(){
        return(
            <div>
            
            </div>
        )
    }
}

