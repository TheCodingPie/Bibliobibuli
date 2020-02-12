import React from 'react';
import * as bookService from '../../services/BookService'

export default class BuyNewBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           book:this.props.location.state.book,
           user:this.props.location.state.user,
        }
    }


    render(){
       
        return(
            <div>

            </div>
        )
    }

}