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

export default class program extends Component {
  constructor(props){
    super(props)
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
    const user_type = "Instructor"
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
                  return(<span key={i._id}> {i.first_name} </span>)
                })
                }
                </Card.Text>
                <Card.Text>
                location: {this.props.program.location}
                </Card.Text>
                <Card.Text>
                age: {this.props.program.ages.map((age)=>{
                  return(<span key={age}> {age} </span>)
                })
                }
                </Card.Text>
                <Card.Text>
                {this.props.program.days.map(day=><span key={day}> {day.substring(0,2)} </span>)}
                : {this.getTime(this.props.program.time.start_time)}
                ~{this.getTime(this.props.program.time.end_time)}
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
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.setState({
              showModal: false
            });
          }}
          dialogClassName="modalSize"
        >
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
              <Col>{this.props.program.days.map(day=><span key={day}> {day.substring(0,2)} </span>)}| {this.getTime(this.props.program.time.start_time)}
                ~{this.getTime(this.props.program.time.end_time)}</Col>
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
            <Row style={{display:'flex', justifyContent:'center'}}>
              <Button style ={{border:'none', backgroundColor:'red', color:'#fff', width:'95%'}}>Remove Program</Button>
            </Row>
          </Modal.Body>
        </Modal>
        {/* Check the user type, if it is parent, then show the class detail and Register
        if it is instructor, then show attendence and program setting(such as delete, schedule change...) */}
        {
          user_type === "Parent"?
          <ParentModal {...this.props} showModal={this.state.showModal} setModal={()=>{this.setState({showModal: false})}} getTime = {this.getTime}/>
          :
          <InstructorModal {...this.props}  showModal={this.state.showModal} setModal={()=>{this.setState({showModal: false})}} getTime = {this.getTime}/>
        }
      </>
    )
  }
}
