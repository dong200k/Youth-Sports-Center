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
        dayFilter:'',
        locationFilter: '',
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
        locations: !filter.locationFilter||filter.locationFilter===''?null:[filter.locationFilter],
        //for future maybe allow multiple selections with array
        // days: [...this.state.dayFilter],
        // ages: [...this.state.ageFilter].map(age=>parseInt(age)),
        // sports: [...this.state.sportFilter]
        
      }
    }

    //********TODO: add loading here****************
    programService.filterProgram(data)
      .then(response=>{

         //********TODO: stop loading here****************
         
        console.log(response.data.result[0].data)
        this.setState({
          programs: response.data.result[0].data,
          filter: filter,
          isLoad: false
        })
      })
      .catch(err=>{
        this.setState({
          isError: err
        })
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
      dayFilter:'',
      locationFilter: '',
    }
    this.updateProgram(filter)
  }

  updateAppState = (stateObj) =>{
    const filter = {
      ageFilter: stateObj.ageFilter || stateObj.ageFilter===""? stateObj.ageFilter : this.state.filter.ageFilter,
      sportFilter: stateObj.sportFilter || stateObj.sportFilter===""? stateObj.sportFilter : this.state.filter.sportFilter,
      dayFilter: stateObj.dayFilter || stateObj.dayFilter===""? stateObj.dayFilter : this.state.filter.dayFilter,
      locationFilter: stateObj.locationFilter || stateObj.locationFilter===""? stateObj.locationFilter : this.state.filter.locationFilter,
    }
    this.setState({isLoad:true})
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

  initailFilter = () => {
    const filter = {
      ageFilter:'',
      sportFilter:'',
      dayFilter:'',
      locationFilter: '',
    }
    this.updateProgram(filter)
  }
  render() {
    return (
      <div className="page">
        <div className="pageHeader">
          {/* <ProgramFilter updateAppState = {this.updateAppState}/> */}
          <ProgramFilter updateAppState = {this.updateAppState} filter = {this.state.filter}/>
        </div>
        <div className="pageBody">
          <Programs {...this.state} initailFilter={this.initailFilter}/>
        </div>
      </div>
    )
  }
}
