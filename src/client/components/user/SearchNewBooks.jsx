import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as bookService from '../../services/BookService'


class SearchNewBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",

      booksToShow: [],
      

    }

   
  }



  onChangeInput = async (input) => {
    if (input.length == 0) {
      this.setState({ booksToShow: [] });
      return;
    }
    if (input.length !== 1) return;
    this.setState({ booksToShow: await bookService.searchNewBooks(input) });
  }




 


  render() {

    return (

       
                  <Typeahead 
                    id="basic-example"
                    labelKey="name"
                    
                    onChange={selected => this.props.selectBook(selected)}
                    options={this.state.booksToShow}
                    placeholder="Unesite naziv nove knjige"

                    onInputChange={input => this.onChangeInput(input)}
                  />
            
      

    )
  }

}

export default SearchNewBooks




