import React, { Component } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import * as bookService from '../services/BookService'
//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state =
    {
      podaci: [],

    }

  }

  

  


  obradiInput = async(input) => {
    
    let booksToTrade=await bookService.searchBarTrade(input);
   
    this.setState({ podaci: booksToTrade.data });
  };

  render() {
    
    return (
     
      <Typeahead
        id="basic-example"
        labelKey="name"
        onChange={selected => this.props.obradiIzbor(selected)}
        options={this.state.podaci}
        placeholder="Pretrazi knjige za trampu"
        onInputChange={input => this.obradiInput(input)}
      />
    );
  }
}