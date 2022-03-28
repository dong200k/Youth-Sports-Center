import Dropdown from 'react-bootstrap/Dropdown'
import React, { Component } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Container from 'react-bootstrap/Container'
import Filter from './filter.jsx'
import './programFilter.css'

const age_range = [3,4,5,6,7,8,9,10,11]
const sport_range = ['soccer','basketball','baseball']
const weekday_range = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  
export default class programFilter extends Component {
  constructor(props){
    super(props)
    this.state = this.props.state.filter
    console.log("asd")
    console.log(this.state.ageFilter)
  }
  
  updateFilter = (stateObj) =>{
    // this.setState(stateObj) 
    this.props.updateAppState(stateObj)
  }

  initialFilter = (filterType) => {
    if(filterType == 'ageFilter'){
      this.updateFilter({ageFilter:''})
    }
    else if(filterType == 'sportFilter'){
      this.updateFilter({sportFilter:''})
    }
    else if(filterType == 'dayFilter'){
      this.updateFilter({dayFilter:''})
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
      </div>
    )
  }
}
