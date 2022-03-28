import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const key = 'ageFilter'
export default class filter extends Component {

  render() {
    return (
        <Dropdown style={{marginLeft:'10px'}}>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  >
                {this.props.type} 
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
                {this.props.range.map(i => {
                    return (
                    <Dropdown.Item onClick={()=>{this.props.updateFilter({ageFilter:i})}} key={i}>
                        {i}
                    </Dropdown.Item>
                    )
                }
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
  }
}
