import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Attendance from '../attendance/Attendance'

export default class InstructorModal extends Component {
  render() {
    return (
        <Modal show={this.props.showModal} onHide={this.props.setModal} dialogClassName="modalSize">
        <Modal.Header style={{marginLeft:'2.5%', width:'95%'}} closeButton>
            <Modal.Title>
                {this.props.program.program_name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:'Quicksand',fontWeight:'500', fontSize:'20px'}}>
            <Attendance program={this.props.program}/>
        </Modal.Body>
    </Modal>
    )
  }
}
