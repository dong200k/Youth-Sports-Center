import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Container from 'react-bootstrap/Container'
import Filter from './filter.jsx'
import './programFilter.css'
import Button from 'react-bootstrap/esm/Button'
import { UserContext } from '../../context/UserContext.jsx'

const age_range = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
const sport_range = ["Soccer", "Basketball", "Football", "Badminton", "Handball", "Volleyball", "Tennis", "Baseball"]
const weekday_range = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const location_range = [
  "Alley Pond Park-PS420 Gym",
  "Astoria/LIC-PS360 Track",
  "Bayside-Auburndale PS96 Gym",
  "Cunningham Park",
  "Elmhurst Park",
  "RiverSide Park",
  "Inwood Hill Park",
  "Prospect Park",
]
export default class programFilter extends Component {
  static contextType = UserContext

  constructor(props){
    super(props)
    // this.state = this.props.state.filter
    // console.log("asd")
    // console.log(this.state)
    this.state = props.filter
  }

  componentDidUpdate(prevProps){
    if(this.props.filter != prevProps.filter){
      this.setState(
        this.props.filter
      )
    } 
  }
  
  updateFilter = (stateObj) =>{
    this.setState(stateObj) 
    this.props.updateAppState(stateObj)
  }

  initialFilter = (filterType) => {
    if(filterType === 'ageFilter'){
      this.updateFilter({ageFilter:''})
    }
    else if(filterType === 'sportFilter'){
      this.updateFilter({sportFilter:''})
    }
    else if(filterType === 'dayFilter'){
      this.updateFilter({dayFilter:''})
    }else if(filterType === 'locationFilter'){
      this.updateFilter({locationFilter:''})
    }else if(filterType === 'userFilter'){
      this.updateFilter({myprogram: false})
    }
    
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.ageFilter !== this.state.ageFilter) {
  //     console.log('pokemons state has changed.')
  //   }
  // }

  
  render() {
    return (
      <div className='filterContainer'>
        <Dropdown style={{marginLeft:'10px'}}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  >
              {this.state.ageFilter === ''? 'age' : this.state.ageFilter} 
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
              {age_range.map(i => {
                  return (
                  <Dropdown.Item onClick={()=>{this.updateFilter({ageFilter:i})}} key={i}>
                      {i}
                  </Dropdown.Item>
                  )
              }
              )}
              <Dropdown.Item onClick={() => {this.initialFilter('ageFilter')}}>
                <i className="fa-solid fa-xmark" />
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={{marginLeft:'10px'}}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  >
            {this.state.sportFilter === ''? 'sport' : this.state.sportFilter} 
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
              {sport_range.map(i => {
                  return (
                  <Dropdown.Item onClick={()=>{this.updateFilter({sportFilter:i})}} key={i}>
                      {i}
                  </Dropdown.Item>
                  )
              }
              )}
              <Dropdown.Item onClick={() => {this.initialFilter('sportFilter')}}>
                <i className="fa-solid fa-xmark" />
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={{marginLeft:'10px'}}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  >
            {this.state.dayFilter === ''? 'weekday' : this.state.dayFilter} 
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
              {weekday_range.map(i => {
                  return (
                  <Dropdown.Item onClick={()=>{this.updateFilter({dayFilter:i})}} key={i}>
                      {i}
                  </Dropdown.Item>
                  )
              }
              )}
              <Dropdown.Item onClick={() => {this.initialFilter('dayFilter')}}>
                <i className="fa-solid fa-xmark" />
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={{marginLeft:'10px'}}>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"  >
              {this.state.locationFilter === ''? 'location' : this.state.locationFilter} 
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
              {location_range.map(i => {
                  return (
                  <Dropdown.Item onClick={()=>{this.updateFilter({locationFilter:i})}} key={i}>
                      {i}
                  </Dropdown.Item>
                  )
              }
              )}
              <Dropdown.Item onClick={() => {this.initialFilter('locationFilter')}}>
                <i className="fa-solid fa-xmark" />
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {
          this.context.user.user_type == "Parent" &&
         <Button style={{marginLeft:'10px'}} id="dropdown-button-dark-example1" variant={this.props.filter.myprogram?"primary":"secondary"} onClick={()=>this.updateFilter({myprogram: !this.state.myprogram})} >
              My Programs
          </Button>
        }
      </div>
    )
  }
}
