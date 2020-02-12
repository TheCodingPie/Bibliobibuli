import React from 'react';
import { Card, Button, Modal, Image, Container, Col, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as bookService from '../../services/BookService'


class SearchNewBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      book:{usernamePublisher:"",name:"",nameAuthor:"",lastnameAuthor:"",bookType:"",description:""
      ,price:0,countOfBooks:0,yearPublishing:0, comments:[], averageReview:0},

      booksToShow: [],
      user:this.props.location.state.user,

    }

   
  }



  onChangeInput = async (input) => {
    if (input.length == 0) {
      this.setState({ booksToShow: [] });
      return;
    }
    if (input.length !== 1) return;
    this.setState({ booksToShow: await bookService.searchNewBooks(input.charAt(0)) });
  }

  selectBook = async (selected) => {
    if (selected.length === 0) return;
  this.props.history.push({
    pathname: `/SeeNewBookUser`,
      state: { bookid: selected[0]._id , user:this.state.user }});

  }





 


  render() {

    return (
      <div style={{ flexGrow: 1, width: '100%' }}>
        <Container>
          <Row>
            <Col xs={0.5}></Col>

            <Col xs={11} className="center mt-3 justify-content-center">

              <Row className="justify-content-md-center mb-5">
                <Col xs={4}></Col>
                <Col xs={4}>
                  <Typeahead 
                    id="basic-example"
                    labelKey="name"
                    
                    onChange={selected => this.selectBook(selected)}
                    options={this.state.booksToShow}
                    placeholder="Unesite naziv knjige"

                    onInputChange={input => this.onChangeInput(input)}
                  />
                </Col>
                <Col xs={4}></Col>
              </Row>

            </Col>

            <Col xs={0.5}></Col>


          
          </Row>

        </Container>
      </div>

    )
  }

}

export default SearchNewBooks




