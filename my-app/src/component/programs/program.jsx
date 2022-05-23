import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './program.css'
import basketImg from '../../assets/basketball-program.jpg'
import baseballImg from '../../assets/baseball-program.jpg'
import soccerImg from '../../assets/soccer-program.jpg'
import defaultImg from '../../assets/default-program.jpg'
import footballImg from '../../assets/football-program.jpg'
import badmintonImg from '../../assets/badminton-program.jpg'
import handballImg from '../../assets/handball-program.jpg'
import tennisImg from '../../assets/tennis-program.jpg'
import volleyballImg from '../../assets/volleyball-program.jpg'
import ParentModal from './modal/ParentModal'
import InstructorModal from './modal/InstructorModal'
import {UserContext} from '../../context/UserContext.jsx'
import programService from '../../services/program.service.js'
import { v4 as uuidv4 } from "uuid"

export default class program extends Component {
  static contextType = UserContext
  
  constructor(props){
    super(props)
    this.state = {
      programImg: defaultImg,
      showModal:false,
      error:'',
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    if(props.program.sport_type === 'Basketball'){
      this.state.programImg = basketImg
    }
    else if(props.program.sport_type === 'Baseball'){
      this.state.programImg = baseballImg
    }
    else if(props.program.sport_type === 'Soccer'){
      this.state.programImg = soccerImg
    }
    else if(props.program.sport_type === 'Football'){
      this.state.programImg = footballImg
    }
    else if(props.program.sport_type === 'Badminton'){
      this.state.programImg = badmintonImg
    }
    else if(props.program.sport_type === 'Handball'){
      this.state.programImg = handballImg
    }
    else if(props.program.sport_type === 'Tennis'){
      this.state.programImg = tennisImg
    }
    else if(props.program.sport_type === 'Volleyball'){
      this.state.programImg = volleyballImg
    }
  } 

  state = {
    programImg: defaultImg,
    showModal:false,
    error:'',
  }
  async handleRegister(kids){
    if(!this.state||!this.state.showModal||this.currentProgram==="")
      return
    const user = this.context.user
    const kidsToEnroll = []
    //kids is object with key(kid_id)
    for(const kid in kids){
      kidsToEnroll.push(kid)
    }
    if(kidsToEnroll.length===0)
      return
    let data = {
      kids: kidsToEnroll,
      parent_id: user._id,
      program_id: this.props.program._id
    }
    return programService.enrollKid(data)
      .then(res=>{
        if(res.data.status==="success"){
          console.log("Enrolled Kids!")
          console.log(res.data)
          return true
        }else return false
      })
      .catch(err=>this.setState({error:{message:err.response.data.error}}))
  }

  async handleDrop(kids){
    if(!this.state||!this.state.showModal||this.currentProgram==="")
      return
    const user = this.context.user
    const kidsToDrop = []
    //kids is object with key(kid_id)
    for(const kid in kids){
      kidsToDrop.push(kid)
    }
    if(kidsToDrop.length===0)
      return
    let data = {
      kids: kidsToDrop,
      parent_id: user._id,
      program_id: this.props.program._id
    }
    return programService.dropKid(data)
      .then(res=>{
        if(res.data.status==="success"){
          console.log("Dropped Kids!")
          console.log(res.data)
          return true
        }else return false
      })
      .catch(err=>console.log(err))
  }

  getTime = time => {
    let hour = Math.floor(time/60)
    let min = Math.floor(time%60)
    if(hour<10)
      hour = "0"+hour.toString()
    else
      hour = hour.toString()
    if(min<10)
      min = "0"+min.toString()
    else
      min = min.toString()
    return hour+":"+min
  }


  render() {
    const user_type = this.context.user.user_type
    return (
      <>
        <Card className='programCard' style={{ width: '380px', margin : '10px' }}
          onClick={() => {
            this.setState({
              showModal: true
            });
        }}
        >
            <Card.Img variant="top" style={{width:'100%', height:'250px', objectFit:'cover'}} src={this.state.programImg} />
            <Card.Body>
                <Card.Title style={{fontWeight:'bolder', borderBottom: '1px solid grey'}}>{this.props.program.program_name}</Card.Title>
                <Card.Text>
                Coach: {this.props.program.instructors.map((i)=>{
                  return(<span key={uuidv4()}> {i.first_name} </span>)
                })
                }
                </Card.Text>
                <Card.Text>
                location: {this.props.program.location}
                </Card.Text>
                <Card.Text>
                age: {this.props.program.ages.map((age)=>{
                  return(<span key={uuidv4()}> {age} </span>)
                })
                }
                </Card.Text>
                <Card.Text>
                {this.props.program.days.map(day=><span key={uuidv4()}> {day.substring(0,2)} </span>)}
                : {this.getTime(this.props.program.time.start_time)}
                ~{this.getTime(this.props.program.time.end_time)}
                </Card.Text>
                <Card.Text>
                  Current Enrolled: {this.props.program.kids.length} / {this.props.program.capacity}
                </Card.Text>
                <Card.Text style={{ borderTop:'1px solid grey', color:'grey', justifyContent:'space-between', display:'flex'}}>
                    <span className={`${this.props.program.days.filter(day=>day==='Monday')[0] ? 'weekday':''}`}>M</span>
                    <span className={`${this.props.program.days.filter(day=>day==='Tuesday')[0] ? 'weekday':''}`}>T</span>
                    <span className={`${this.props.program.days.filter(day=>day==='Wednesday')[0] ? 'weekday':''}`}>W</span>
                    <span className={`${this.props.program.days.filter(day=>day==='Thursday')[0] ? 'weekday':''}`}>Th</span>
                    <span className={`${this.props.program.days.filter(day=>day==='Friday')[0] ? 'weekday':''}`}>F</span>
                    <span className={`${this.props.program.days.filter(day=>day==='Saturday')[0] ? 'weekday':''}`}>Sa</span>
                    <span className={`${this.props.program.days.filter(day=>day==='Sunday')[0] ? 'weekday':''}`}>S</span>      
                </Card.Text>
            </Card.Body>
        </Card>
        {/* Check the user type, if it is parent, then show the class detail and Register
        if it is instructor, then show attendence and program setting(such as delete, schedule change...) */}
        {
          user_type === "Parent"?
          this.state.showModal&&<ParentModal {...this.props} 
            showModal={this.state.showModal} 
            setModal={()=>{this.setState({showModal: false})}} 
            getTime = {this.getTime}
            registerKid = {this.handleRegister}
            clear={()=>this.setState({error:''})}
            error={this.state.error} 
            dropKid = {this.handleDrop}/>
          :
          this.state.showModal&&<InstructorModal {...this.props}  clear={()=>this.setState({error:''})} error={this.state.error} showModal={this.state.showModal} setModal={()=>{this.setState({showModal: false})}} getTime = {this.getTime}/>
        }
      </>
    )
  }
}
