import React, { Component } from 'react'
import './parentProgram.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgramFilter from '../../component/programFilter/programFilter.jsx'
import Programs from '../../component/programs/programs.jsx'
import Loading from '../../component/loading/loading'

const programs = [
  {
  id: '123456',
  program_name: 'Baseball 500',
  sport_type: 'baseball',
  instructors: ['coach a', 'b', 'c'],
  ages: ['1', '2', '3', '4'],
  location: '5000 x street',
  capacity: '30',
  enrolled: '20',
  weekday: 'Mon',
  starttime: '11:11am',
  endtime:'12:12pm',
  session:'Spring 2/22~3/27'
  },
  {
  id: '12346',
  program_name: 'Soccer 500',
  sport_type: 'soccer',
  instructors: ['coach a', 'b', 'c'],
  ages: ['1', '2', '3', '4'],
  location: '5000 x street',
  capacity: '30',
  enrolled: '20',
  },
  {
  id: '1236',
  program_name: 'Swimming 500',
  sport_type: 'swimming',
  instructors: ['coach a', 'b', 'c'],
  ages: ['1', '2', '3', '4'],
  location: '5000 x street',
  capacity: '30',
  enrolled: '20',
  },
  {
  id: '13456',
  program_name: 'Basketall 500',
  sport_type: 'basketall',
  instructors: ['coach a', 'b', 'c'],
  ages: ['1', '2', '3', '4'],
  location: '5000 x street',
  capacity: '30',
  enrolled: '20',
  }
]
export default class parentProgram extends Component {

  state = {
      programs: programs,
      isLoad: false,
      isError:''
  }
    
  updateAppState = (stateObj) =>{
    this.setState(stateObj) 
  }

  render() {
    return (
      <div className="page">
        <div className="pageHeader">
          <ProgramFilter updateAppState = {this.updateAppState}/>
        </div>
        <div className="pageBody">
          <Programs {...this.state}/>
        </div>
      </div>
    )
  }
}
