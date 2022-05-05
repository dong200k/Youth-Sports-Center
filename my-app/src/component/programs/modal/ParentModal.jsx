import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UserContext } from '../../../context/UserContext.jsx'
import kidService from '../../../services/kid.service.js'
import { v4 as uuidv4 } from "uuid"
import "./parentModal.css"

export default class ParentModal extends Component {
    static contextType = UserContext
    constructor(props){
        super(props)
        this.state = {
          kids: [],
          enrolledKids: []
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
          <div className="classinfo">
            <div className="classinfo-label">Program:</div>
            <span>{this.props.program.program_name}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Address:</div>
            <span>{this.props.program.location}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Session:</div>
            <span>{this.props.program.time.start_date.substring(0,10)}~{this.props.program.time.end_date.substring(0,10)}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Schedule:</div>
            <span>{this.props.program.days.map(day=><span key={uuidv4()}> {day.substring(0,2)} </span>)}| {this.props.getTime(this.props.program.time.start_time)}
              ~{this.props.getTime(this.props.program.time.end_time)}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Coach:</div>
            <span>{this.props.program.instructors.map((i)=>{
                return(<span key={uuidv4()}> {i.first_name} ;</span>)
              })
              }</span>
          </div>
          <div className="classinfo" style={{ paddingBottom:"20px", borderBottom: "1px solid rgb(221, 219, 219)"}}>
            <div className="classinfo-label">Age range:</div>
            <span>{this.props.program.ages.map((age)=>{
                return(<span key={uuidv4()}> {age} </span>)
              })
              }</span>
          </div>
          <div className="kid-register">
            <div className="kid-register-header">
              <i className="fa-solid fa-angles-right"></i>
              <div className="kid-register-title">Kid attempt to register</div>
            </div>
            <Form>
              <div className="kid-register-form">
                {this.state.kids.length === 0?
                <div>No kids aviliable</div>
                :              
                this.state.kids.map((kid) => 
                (
                  <Form.Check className="kid-register-item" key={uuidv4()} type="checkbox"
                  id={`${kid._id}`} label={`${kid.first_name+" "+kid.last_name}`}
                  isValid ></Form.Check>
                )
                )
                }
              </div>
              <Button className="kid-register-btn" type="submit" onClick = {this.handleRegister}>Register Kid</Button>
          </Form>
          </div>
          <div className="kid-register">
            <div className="kid-register-header">
              <i className="fa-solid fa-angles-right"></i>
              <div className="kid-register-title">Kid have enrolled</div>
            </div>   
            <Form>
              <div className="kid-register-form">
                {this.state.enrolledKids.length === 0?
                <div>No kids aviliable</div>
                :              
                this.state.enrolledKids.map((kid) => 
                (
                  <Form.Check className="kid-register-item" key={uuidv4()} type='checkbox'
                  id={`${kid._id}`} label={`${kid.first_name+" "+kid.last_name}`}
                  isValid ></Form.Check>
                )
                )
                }
              </div>
              <Button className="kid-register-btn" onClick = {this.handleRegister}>Drop Kid</Button>
          </Form>
          </div>
        </Modal.Body>
    </Modal>
    )
  }
}
