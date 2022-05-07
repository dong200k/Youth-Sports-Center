import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'

//to change the week, and back to current day
export default class CalendarHeader extends Component {
  constructor(props){
    super(props)

  }

  componentDidUpdate(prevProps){
    if(this.props.kids != prevProps.kids){
      const filter_range = []
      this.props.kids.map(k => {
        const kid = {id:k._id,
                     name:k.first_name +' '+ k.last_name}
        filter_range.push(kid)
      })
      this.setState({filter_range:filter_range})
    } 
  }

  initFilter = () =>{
    const filter_range = []
    this.props.kids.map(k => {
      filter_range.push(k.first_name)
    })
    this.setState({
      filter_range:filter_range
    })
  }

  state = {
    filter_range:[]
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
                  {this.props.filter.name} 
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                  {this.state.filter_range.map(i => {
                      return (
                      <Dropdown.Item onClick={()=>this.props.handleFilter(i)} key={i.id}>
                          {i.name}
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
