import React, { Component } from "react";


import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { Button, Modal } from "react-bootstrap";

class FirstPageUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.location.state.user,
      
    };
    console.log(this.state.user)
  }

 addBook=()=>{
    this.props.history.push({
        pathname: `/AddBook`,
    state: { user: this.state.user }
      });
 }
changeAdress=()=>{
  this.props.history.push({
    pathname: `/ChangeAdressUser`,
state: { user: this.state.user }
  });
}
searchNewBooks=()=>{
  this.props.history.push({
    pathname: `/SearchNewBooks`,
state: { user: this.state.user }
  });
}

addTopic=()=>{
  this.props.history.push({
    pathname: `/AddTopic`,
    state: { user: this.state.user }
  });
}

seeTopics=(trending)=>{
  this.props.history.push({
    pathname: `/SeeTopics`,
    state: { user: this.state.user,trending }
  });
}
 

  render() {
    return (
      <div style={{flexGrow:1, flexShrink:1, flexBasis:1}}>
      <div className="w-100" style={{

       

      }} >
       
          <Navbar bg="light" expand="lg">
            <Navbar.Brand>Bibliobibuli</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <NavDropdown.Item ><Button onClick={this.addBook}>Dodaj knjigu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.changeAdress}>Promeni adresu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.searchNewBooks}>Pretrazi nove knjige</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.addTopic}>Pokreni temu na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.seeTopics(true)}>Pregledaj najaktuelnije teme na forumu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={()=>this.seeTopics(false)}>Pregledaj sve teme na forumu</Button></NavDropdown.Item>
                </NavDropdown>
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>
       


    
</div>
     
      </div>
    );
  }
}

export default FirstPageUser;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="justify-content-center row">
        <text>Pobednici:</text>
      </div>
      <Modal.Body className="justify-content-center col ">
        <div className="justify-content-center row">{props.data}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zatvori</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal2(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="justify-content-center row">
        <text>Vasa prijava je prosla:</text>
      </div>
      <Modal.Body className="justify-content-center col ">
        <div className="justify-content-center row">{props.data}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zatvori</Button>
      </Modal.Footer>
    </Modal>
  );
}
