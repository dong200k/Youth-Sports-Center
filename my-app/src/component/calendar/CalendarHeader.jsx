import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

//to change the week, and back to current day
export default class CalendarHeader extends Component {
  constructor(props){
    super(props)
  }

  state = {
    filter_range:["Lun","Refeal","Dong","Luis"]
  }

  render() {
    return (
      <div className="calendar-header">
          <div className="calendar-header-switch">
            <div onClick={this.props.prevClick} className="calendar-header-btn">
                <i className="fa-solid fa-angle-left"></i>
            </div>
            <div className="calendar-header-content">{this.props.currentList[0].cYMD} ~ {this.props.currentList[6].cYMD}</div>
            <div onClick={this.props.nextClick} className="calendar-header-btn"> 
                <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="calendar-header-filter">
            <Dropdown style={{marginLeft:'10px'}}>
              <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  >
                  {this.props.filter} 
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                  {this.state.filter_range.map(i => {
                      return (
                      <Dropdown.Item key={i}>
                          {i}
                      </Dropdown.Item>
                      )
                  }
                  )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
      </div>
    )
  }
}
