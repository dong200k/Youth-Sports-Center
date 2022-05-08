import React, { Component } from 'react'
import './instructorProgram.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgramFilter from '../../component/programFilter/programFilter.jsx'
import Programs from '../../component/programs/programs.jsx'
import programService from '../../services/program.service.js';
import Profile from '../../component/profile/profile'
import {UserContext} from '../../context/UserContext.jsx'
import CreateProgram from '../../component/createProgramForm/createProgram';

export default class parentProgram extends Component {

  static contextType = UserContext

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

//   async updateUser(newUser){
//     if(isDifferent(user, newUser)){
//         let update = {
//             first_name: newUser["first name"],
//             last_name: newUser["last name"],
//             email: newUser.email,
//             contacts: [newUser.phone],
//             _id: user_id
//         }
//         return userService.updateUser(update)
//             .then(res=>{
//                 if(res.data.status==="success"){
//                     setUser(update)
//                     return true
//                 }else
//                     return false
//             })
//             .catch(err=>false)
//     }
//     else
//         return true
// }


  getMyProgram = () => { 
    const user_id = this.context.user._id
    const kid_id = this.props._id
    // programService.getUserProgram(user._id)
    //     .then(res=>{
    //     if(res.data.status==="success"){
    //         setProgramNames(res.data.programs)
    //     }
    //     })
    //     .catch((e)=>console.log(e))
    // }, [user])

    //********TODO: add loading here****************
    programService.getUserProgram(user_id)
        .then(response=>{

          //********TODO: stop loading here****************
          // let programs = []
          // response.data.programs.map(program => program.kids.includes(kid_id)?programs.push(program):null)
          console.log(response.data.programs)
          this.setState({
            programs: response.data.programs,
          })
        })
        .catch(err=>{
          this.setState({
            isError: err
          })
          console.log(err)
        })

      this.setState({
        filter:{
          ageFilter:'',
          sportFilter:'',
          dayFilter:'',
          locationFilter: '',
        }
      })
  }
  render() {
    return (
      <div className="instructorProgram">
        <div className="instructor-profile">
          {/* <Profile key={this.context.user._id} updateUser={updateUser} user={this.context.user}/> */}
        </div>
        <div className="instructorProgram-create">
            <CreateProgram />
        </div>  
        <div className="instructorProgram-filter">
          {/* <ProgramFilter updateAppState = {this.updateAppState}/> */}
          <ProgramFilter getKidProgram={this.getMyProgram} updateAppState = {this.updateAppState} filter = {this.state.filter}/>
        </div>
        <div className="instructorProgram-body">
          <Programs {...this.state} initailFilter={this.initailFilter}/>
        </div>
      </div>
    )
  }
}
