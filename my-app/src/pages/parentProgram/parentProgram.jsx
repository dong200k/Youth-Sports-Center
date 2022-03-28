import React, { Component } from 'react'
import './parentProgram.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgramFilter from '../../component/programFilter/programFilter.jsx'
import Programs from '../../component/programs/programs.jsx'
import Loading from '../../component/loading/loading'
import programService from '../../services/program.service.js';
import filter from '../../component/programFilter/filter.jsx';

export default class parentProgram extends Component {
  constructor(props){
    super(props)
    this.state = {
      programs: [],
      isLoad: false,
      isError:'',
      filter:{
        ageFilter:'',
        sportFilter:'',
        dayFilter:''
      }
    }
  }
  updateProgram(filter){
    const data = {
      filter:{
        pageNumber: 1,
        pageSize: 100,
        days: !filter.dayFilter||filter.dayFilter===''?null:[filter.dayFilter],
        ages: !filter.ageFilter||filter.ageFilter===''?null:[parseInt(filter.ageFilter)],
        sports: !filter.sportFilter||filter.sportFilter===''?null:[filter.sportFilter],
        //for future maybe allow multiple selections with array
        // days: [...this.state.dayFilter],
        // ages: [...this.state.ageFilter].map(age=>parseInt(age)),
        // sports: [...this.state.sportFilter]
        
      }
    }
    programService.filterProgram(data)
      .then(response=>{
        console.log(response.data.result[0].data)
        this.setState({
          programs: response.data.result[0].data,
          filter: filter
        }
      )})
      .catch(err=>{
        console.log(err)
      })
  }

  // componentDidUpdate(){
  //   this.updateProgram()
  // }

  componentWillMount(){
    const filter = {
      ageFilter:'',
      sportFilter:'',
      dayFilter:''
    }
    this.updateProgram(filter)
  }

  updateAppState = (stateObj) =>{
    // this.setState(prev=>({
    //   filter: {
    //     ageFilter: stateObj.ageFilter? stateObj.ageFilter : prev.filter.ageFilter,
    //     sportFilter: stateObj.sportFilter? stateObj.sportFilter : prev.filter.sportFilter,
    //     dayFilter: stateObj.dayFilter? stateObj.dayFilter : prev.filter.dayFilter,
    //   }
    // })) 
    const filter = {
      ageFilter: stateObj.ageFilter? stateObj.ageFilter : this.state.filter.ageFilter,
      sportFilter: stateObj.sportFilter? stateObj.sportFilter : this.state.filter.sportFilter,
      dayFilter: stateObj.dayFilter? stateObj.dayFilter : this.state.filter.dayFilter,
    }
    this.updateProgram(filter)
  }

  // shouldComponentUpdate(prevProps, prevState) {
    //for filter
    // if (prevState.filter.ageFilter !== this.state.filter.ageFilter ||
    //     prevState.filter.sportFilter !== this.state.filter.sportFilter ||
    //     prevState.filter.dayFilter !== this.state.filter.dayFilter ||
    //     prevState.programs!== this.state.programs) {
    //   console.log('What? Pikachu is evolving!')
    //   return true
    // }

    // return false
  // }

  render() {
    return (
      <div className="page">
        <div className="pageHeader">
          {/* <ProgramFilter updateAppState = {this.updateAppState}/> */}
          <ProgramFilter state = {this.state} updateAppState = {this.updateAppState}/>
        </div>
        <div className="pageBody">
          <Programs {...this.state}/>
        </div>
      </div>
    )
  }
}
