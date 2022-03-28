import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './program.css'
import basketImg from '../../assets/basketball-program.jpg'
import baseballImg from '../../assets/baseball-program.jpg'
import soccerImg from '../../assets/soccer-program.jpg'
import defaultImg from '../../assets/default-program.jpg'
import Form from 'react-bootstrap/Form'

export default class program extends Component {
  constructor(props){
    super(props)
    if(props.program.sport_type === 'basketball'){
      this.state.programImg = basketImg
    }
    else if(props.program.sport_type === 'baseball'){
      this.state.programImg = baseballImg
    }
    else if(props.program.sport_type === 'soccer'){
      this.state.programImg = soccerImg
    }
  }

  state = {
    showModal: false,
    programImg: defaultImg,
    kids: [{name:'Lun'},{name:'ki'}]
  }



  render() {
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
                  return(<span key={i}> {i} </span>)
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
                {this.props.program.weekday}: {this.props.program.starttime}
                ~{this.props.program.endtime}
                </Card.Text>
                <Card.Text style={{ borderTop:'1px solid grey', color:'grey', justifyContent:'space-between', display:'flex'}}>
                    <span className={`${this.props.program.weekday === 'Mon' ? 'weekday':''}`}>M</span>
                    <span className={`${this.props.program.weekday === 'Tue' ? 'weekday':''}`}>T</span>
                    <span className={`${this.props.program.weekday === 'Wed' ? 'weekday':''}`}>W</span>
                    <span className={`${this.props.program.weekday === 'Thu' ? 'weekday':''}`}>Th</span>
                    <span className={`${this.props.program.weekday === 'Fri' ? 'weekday':''}`}>F</span>
                    <span className={`${this.props.program.weekday === 'Sat' ? 'weekday':''}`}>Sa</span>
                    <span className={`${this.props.program.weekday === 'Sun' ? 'weekday':''}`}>S</span>      
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
              <Col>{this.props.program.session}</Col>
            </Row>
            <Row>
              <Col style={{maxWidth:'130px'}}>Schedule:</Col>
              <Col>{this.props.program.weekday}| {this.props.program.starttime}
                ~{this.props.program.endtime}</Col>
            </Row>
            <Row>
              <Col style={{maxWidth:'130px'}}>Coach:</Col>
              <Col>{this.props.program.instructors.map((i)=>{
                  return(<span key={i}> {i} </span>)
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
      </>
    )
  }
}
