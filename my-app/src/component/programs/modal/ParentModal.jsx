import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UserContext } from '../../../context/UserContext.jsx'
import kidService from '../../../services/kid.service.js'

export default class ParentModal extends Component {
    static contextType = UserContext
    constructor(props){
        super(props)
        this.state = {
          kids: [],
          enrolledKids: {}
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    componentDidMount(){
      const user = this.context.user
      if(user.user_type!=="Parent")
        return
      kidService.getKids(user._id)
        .then(res=>{
          if(res.data.status==="success"){
            this.setState({
              kids: res.data.kids
            })
          }
        })
        .catch(err=>console.log(err))
    }

    handleClick(e){
      this.setState(prev=>{
        const enrolledKids = {...prev.enrolledKids}
        const id = e.target.id
        if(enrolledKids[id])
          delete enrolledKids[id]
        else
          enrolledKids[id] = 1
        return {
          enrolledKids: enrolledKids
        }
      })
    }

    handleRegister(){
      this.props.registerKid(this.state.enrolledKids)
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
              <Col key={kid._id} className="mb-3">
                <Form.Check type='checkbox' id={`${kid._id}`}>
                  <Form.Check.Label className='kidSelect'>{`${kid.first_name+" "+kid.last_name}`}
                    <Form.Check.Input type='checkbox' isValid onClick={this.handleClick}/>
                  </Form.Check.Label>
                </Form.Check>
              </Col>
            ))
            }
            </Row>
          </Form>
          <Row style={{display:'flex', justifyContent:'center'}}>
            <Button onClick = {this.handleRegister} style={{border:'none',backgroundColor:'rosybrown', color:'#fff', width:'95%'}}>Register Kid</Button>
          </Row>
        </Modal.Body>
    </Modal>
    )
  }
}
