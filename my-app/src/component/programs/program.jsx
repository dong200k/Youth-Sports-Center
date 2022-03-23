import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './program.css'

export default class program extends Component {

  render() {
    return (
        <Card className='programCard' style={{ width: '380px', margin : '10px' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" />
            <Card.Body>
                <Card.Title>{this.props.program.program_name}</Card.Title>
                <Card.Text>
                Coach: {this.props.program.instructors}
                </Card.Text>
                <Card.Text>
                location:{this.props.program.location}
                </Card.Text>
                <Card.Text>
                age:{this.props.program.ages}
                </Card.Text>
                <Button variant="primary">More Details</Button>
            </Card.Body>
        </Card>
    )
  }
}
