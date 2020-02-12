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
 getArtists = async (first_letter) => {
    const response = await fetch('http://localhost:1234/getUsernames/' + first_letter);
    const artists = await response.json();
    //console.log(artists)
    this.setState({ podaci: artists });
  };


  

  


  obradiInput = async(input) => {
    console.log(input)
    let booksToTrade=await bookService.searchBarTrade(input);
    console.log(booksToTrade.data)
    this.setState({ podaci: booksToTrade.data });
  };

  render() {
    
    //this.followArtist('Mina','Stef');
    //this.getComments('joksi').catch(err=> console.log('Fetch Error :-S', err));
    //this.addComment('Pi','4-12-2019 Pavle = Top je sminka').catch((error) =>  console.error('Error:', error));;

    return (
      /* <div  style={{
         
         display:'flex',
         flexDirection:'row'
       }}>*/
      <Typeahead
        id="basic-example"
        labelKey="name"
        onChange={selected => this.props.obradiIzbor(selected)}
        options={this.state.podaci}
        placeholder="Pretrazi sminkere"
        onInputChange={input => this.obradiInput(input)}
      />/*
          <button
              className="btn "
              style={{ backgroundColor: "pink", color: "White" }}
              type="submit"
              data-toggle="popover"
              data-content="Pretrazi"
              onClick={this.props.obradiIzbor}
            >
              Pretrazi
            </button>
      </div>*/
    );
  }
}