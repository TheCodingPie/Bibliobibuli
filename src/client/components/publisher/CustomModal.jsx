import React from 'react';
import {Modal, Button} from 'react-bootstrap';


export default function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="justify-content-center row">
    <text>{props.title}</text>
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
  