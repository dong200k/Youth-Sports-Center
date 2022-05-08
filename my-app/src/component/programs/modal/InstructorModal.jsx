import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Attendance from '../attendance/Attendance'
import { v4 as uuidv4 } from "uuid"
import { UserContext } from '../../../context/UserContext.jsx'

export default class InstructorModal extends Component {
  static contextType = UserContext

  state = {
    currentDate:'',
  }

  componentDidMount(){
    this.initDate()
  }

  handleDelete = () => {

  }

  initDate = () =>{
    let date = new Date()
    let cYear = date.getFullYear()
    let cMonth = this.format(date.getMonth() + 1)
    let cDate = this.format(date.getDate())
    let currentDay = date.getDay()
    let cYMD = `${cYear}-${cMonth}-${cDate}`
    this.setState({currentDate:cYMD})
  }

  format = (num) =>{
    var f = num < 10 ? '0' + num : num;
    return f
}

  render() {
    const user_id = this.context.user._id
    const user_first_name = this.context.user.first_name
    return (
        <Modal show={this.props.showModal} onHide={this.props.setModal} dialogClassName="modalSize">
        <Modal.Header style={{marginLeft:'2.5%', width:'95%'}} closeButton>
            <Modal.Title>
                {this.props.program.program_name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:'Quicksand',fontWeight:'500', fontSize:'20px'}}>
          <div style={{ paddingBottom:"20px", borderBottom: "1px solid rgb(221, 219, 219)"}}>
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
          <div className="classinfo">
            <div className="classinfo-label">Age range:</div>
            <span>{this.props.program.ages.map((age)=>{
                return(<span key={uuidv4()}> {age} </span>)
              })
              }</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Status:</div>
            {
              (this.state.currentDate.localeCompare(this.props.program.time.start_date.substring(0,10))<0)&&
              <span> Wait to Start </span>
            }
            {
              (this.state.currentDate.localeCompare(this.props.program.time.end_date.substring(0,10))>0)&&
              <>
              <span> Expired </span>
              {this.props.program.instructors.includes(user_id)&&
                <button className='classinfo-delete-btn' onClick={this.handleDelete}>Delete Program</button>
              }
              </>
            }
            {
              (this.state.currentDate.localeCompare(this.props.program.time.start_date.substring(0,10))>=0)&&
              (this.state.currentDate.localeCompare(this.props.program.time.end_date.substring(0,10))<=0)&&
              (<span> Current Running </span>)
            }
          </div>
          </div>
            <Attendance program={this.props.program}/>
        </Modal.Body>

    </Modal>
    )
  }
}
