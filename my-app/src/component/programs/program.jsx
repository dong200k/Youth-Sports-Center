import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './program.css'

export default class program extends Component {
  state = {
    showModal: false,
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
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" />
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
  
                    <span className={`${this.props.program.weekday == 'Mon' ? 'weekday':''}`}>M</span>
                    <span className={`${this.props.program.weekday == 'Tue' ? 'weekday':''}`}>T</span>
                    <span className={`${this.props.program.weekday == 'Wed' ? 'weekday':''}`}>W</span>
                    <span className={`${this.props.program.weekday == 'Thu' ? 'weekday':''}`}>Th</span>
                    <span className={`${this.props.program.weekday == 'Fri' ? 'weekday':''}`}>F</span>
                    <span className={`${this.props.program.weekday == 'Sat' ? 'weekday':''}`}>Sa</span>
                    <span className={`${this.props.program.weekday == 'Sun' ? 'weekday':''}`}>S</span>
               
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
          <Modal.Header closeButton>
            <Modal.Title >
              Class Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Row>
              <Modal.Title>
                Course Name
              </Modal.Title>
            </Row>
            <Row>
              <form>
                Name
              </form>
            </Row>
            <Row>
              <Button style={{border:'none',backgroundColor:'rosybrown', color:'#fff'}}>Register Kid</Button>
            </Row>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}
