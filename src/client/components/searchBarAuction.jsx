import React, { Component } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import * as bookService from '../services/BookService'
//SVAKA CUSTOM KOMPONENTA MORA DA POCINJE VELIKIM SLOVOM INACE BACA GRESKU!!!!!!!!!!!!!!!!!!!
//NAPINJE I DA SE IMA KONSTRUKTOR UVEK, MAKAR I PRAZAN
export default class SearchBarAuction extends Component {
  constructor(props) {
    super(props);

    this.state =
    {
      podaci: [],

    }

  }
 getArtists = async (first_letter) => {
    const response = await fetch('http://localhost:1234/getUsernames/' + first_letter);
    const artists = await response.json();
    //console.log(artists)
    this.setState({ podaci: artists });
  };


  obradiInput = async(input) => {
    if(input=="") return
    let booksToAuction=await bookService.searchBarAuction(input);
    console.log(booksToAuction.data)
    this.setState({ podaci: booksToAuction.data });
  };

  render() {
    
    
    return (
     
      <Typeahead
        id="basic-example"
        labelKey="name"
        onChange={selected => this.props.obradiIzbor(selected)}
        options={this.state.podaci}
        placeholder="Pretrazi aukcije"
        onInputChange={input => this.obradiInput(input)}
      />
    );
  }
}