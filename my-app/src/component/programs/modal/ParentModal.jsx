import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class ParentModal extends Component {3
    constructor(props){
        super(props)
    }

    state = {
        kids: [{name:'Lun'},{name:'ki'}]
    }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.setModal} dialogClassName="modalSize">
        <Modal.Header style={{marginLeft:'2.5%', width:'95%'}} closeButton>
          <Modal.Title style={{position:'absolute', left:'50%', width:'140px', marginLeft:'-70px', textAlign:'center'}}>
            Class Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:'Quicksand',fontWeight:'500', fontSize:'20px'}}>
          <Row>
            <Col style={{maxWidth:'130px'}}>Program:</Col>
            <Col>{this.props.program.program_name}</Col>
          </Row>
          <Row>
            <Col style={{maxWidth:'130px'}}>Address:</Col>
            <Col>{this.props.program.location}</Col>
          </Row>
          <Row>
            <Col style={{maxWidth:'130px'}}>Session:</Col>
            <Col>{this.props.program.time.start_date.substring(0,10)}~{this.props.program.time.end_date.substring(0,10)}</Col>
          </Row>
          <Row>
            <Col style={{maxWidth:'130px'}}>Schedule:</Col>
            <Col>{this.props.program.days.map(day=><span key={day}> {day.substring(0,2)} </span>)}| {this.props.getTime(this.props.program.time.start_time)}
              ~{this.props.getTime(this.props.program.time.end_time)}</Col>
          </Row>
          <Row>
            <Col style={{maxWidth:'130px'}}>Coach:</Col>
            <Col>{this.props.program.instructors.map((i)=>{
                return(<span key={i._id}> {i.first_name} </span>)
              })
              }
            </Col>
          </Row>
          <Row>
            <Col style={{maxWidth:'130px'}}>Age range:</Col>
            <Col>{this.props.program.ages.map((age)=>{
                return(<span key={age}> {age} </span>)
              })
              }</Col>
          </Row>
          <Form style={{display:'flex', justifyContent:'center', marginTop: '20px', borderTop:'1px solid rgb(204, 204, 204)'}}>
            <Row style={{marginTop: '20px'}}>
            {this.state.kids.length === 0?
            <Col>No kids aviliable</Col>
            :              
            this.state.kids.map((kid) => 
            (
              <Col key={kid.name} className="mb-3">
                <Form.Check type='checkbox' id={`${kid.name}`}>
                  <Form.Check.Label className='kidSelect'>{`${kid.name}`}
                    <Form.Check.Input type='checkbox' isValid />
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            ))
            }
            </Row>
          </Form>
          <Row style={{display:'flex', justifyContent:'center'}}>
            <Button style={{border:'none',backgroundColor:'rosybrown', color:'#fff', width:'95%'}}>Register Kid</Button>
          </Row>
        </Modal.Body>
    </Modal>
    )
  }
}
