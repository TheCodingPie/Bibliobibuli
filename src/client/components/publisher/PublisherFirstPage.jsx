import React from 'react';
import { Navbar, Nav, NavDropdown,Button } from "react-bootstrap";
class PublisherFirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisher:this.props.location.state.publisher,
                
        }
    }

    addBook=()=>{
        this.props.history.push({
            pathname: `/AddNewBook`,
        state: { publisher: this.state.publisher }
          });
     }
     seeMyBooks=()=>{
        this.props.history.push({
            pathname: `/SeeMyBooks`,
        state: { publisher: this.state.publisher }
          });
     }


    render()
    {
        return(
          <div >
            <Navbar bg="light" expand="large" >
            <Navbar.Brand>Bibliobibuli</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                
                <NavDropdown title="Opcije" id="basic-nav-dropdown">
                  <NavDropdown.Item ><Button onClick={this.addBook}>Dodaj knjigu</Button></NavDropdown.Item>
                  <NavDropdown.Item ><Button onClick={this.seeMyBooks}>Vidi knjige</Button></NavDropdown.Item>
                </NavDropdown>
                
              </Nav>
            </Navbar.Collapse>
            </Navbar>

            </div>
        )
    }


}
export default PublisherFirstPage
