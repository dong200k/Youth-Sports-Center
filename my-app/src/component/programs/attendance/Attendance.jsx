import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid"
import attendanceService from '../../../services/attendance.service.js';
import Student from '../../attendance/Student';
import "./attendance.css"

export default class Attendance extends Component {
    constructor(props){
        super(props);
        // this._onScrollEvent = this._onScrollEvent.bind(this);
    }

    state = {
        schedule:[...this.props.program.schedule],
        attendance:[],
        date: '',
        filter_date: '',
        scrollTop: '',
        showFilter: false,
    }      

    componentDidMount(){ 
        this.initDate();

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._onScrollEvent, false);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.filter_date === this.state.date){
            this._container.scrollTop = this._container.scrollHeight
        }
        else{
            this._container.scrollTop = this.state.scrollTop
        }

        //date change get attendance again
        if(prevState.filter_date!==this.state.filter_date){
            this.getAttendance()
        }

        //attendance record changed
        if(prevState.attendance!==this.state.attendance){
            this.postAttendance()
        }
    }

    getAttendance(){
        //get schedule for one program on one date
        const data = {
            program_id: this.props.program._id,
            date: this.state.filter_date
        }

        console.log(data)
        attendanceService.getAttendance(data)
            .then(res=>{
                if(res.data.status==="success"){
                    this.setState({
                        attendance: res.data.attendance
                    })
                }
            })
            .catch(err=>{
                this.setState({
                    attendance: []
                })
            })
    }

    postAttendance(){
        //post attendance for program on one date
        const data = {
            program_id: this.props.program._id,
            date: this.state.filter_date,
            attendances: this.state.attendance
        }
        attendanceService.upsertAttendance(data)
            .then(res=>{
                if(res.data.status==="success"){
                    console.log("success")
                }
            })
            .catch(err=>{
                console.log("error updating attendance")
                console.log(err)
            })
    }

    // _onScrollEvent() {
    //     if(this.state.filter_date === this.state.date){
    //         this._container.scrollTop = this._container.scrollHeight
    //     }
    // }

    format = (num) =>{
        var f = num < 10 ? '0' + num : num;
        return f
    }

    initDate = () =>{
        let date = new Date()
        let cYear = date.getFullYear()
        let cMonth = this.format(date.getMonth() + 1)
        let cDate = this.format(date.getDate())
        let currentDay = date.getDay()
        let cYMD = `${cYear}-${cMonth}-${cDate}T00:00:00.000Z`
        this.setState({date:cYMD,filter_date:cYMD})
        this.getAttendance()

        const data = {
            program_id: this.props.program._id,
            date: cYMD
        }

        console.log(data)
        attendanceService.getAttendance(data)
            .then(res=>{
                if(res.data.status==="success"){
                    console.log("nihao")
                    this.setState({
                        attendance: res.data.attendance
                    })
                }
            })
            .catch(err=>{
                this.setState({
                    attendance: []
                })
            })
    }
    
    handleFilter = (event) =>{
        this.setState({filter_date:event})
    }

    handleScroll(scrollTop) {
        this.setState({scrollTop: scrollTop});
    }

    showFilter(e){
        this.setState({showFilter:!this.state.showFilter})
    }

    resetFilter(e){
        this.setState({filter_date:this.state.date})
    }

    handleAttended(record){
        console.log(record)
        let newAttendance = this.state.attendance.map((r)=> (r.kid_id === record.kid_id)?
        {...r, attended:record.attended}
        :r
        )
        this.setState({attendance:newAttendance})
    }

  render() {
    return (
      <div className="attendance">
          <div className="attendance-title">
              Attdendance Check
          </div>
          <div className="attendance-header">
              <div className="attendance-filter-box">
                <div className="attendance-filter-btn" onClick={()=>this.showFilter()}> Date: {this.state.filter_date.toString().substring(0,10)} </div>
                <div className={this.state.showFilter?"attendance-filter":"attendance-filter hidden"}>
                  <ul ref={c => this._container = c}>
                    {this.state.schedule.map(date => (date.localeCompare(this.state.date) >= 0)? null:
                        (<li onClick={()=>{this.setState({filter_date:date,scrollTop:this._container.scrollTop,showFilter:false})}} className="attendance-filter-item" key={uuidv4()}>
                            {date.toString().substring(0,10)}
                        </li>)
                    )}
                  </ul>
                </div>
              </div>
              <div className="attendance-filter-btn" onClick={()=>this.resetFilter()}>Go Back to Today</div>

          </div>
          <div className="attendance-body">
            {this.state.attendance.length === 0 && 
                 <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column',height:'50vh', fontFamily:'Quicksand'}}>
                   <i className="fa-solid fa-ban" style={{fontSize:'150px'}}></i>
                    <h4 style={{marginTop:'20px'}}> No Schedule Today </h4>
                 </div>}
            {this.state.attendance.map((record)=>{
                return(
                <div className="attendance-record" key={uuidv4()}>
                    <div className="attendence-name">
                        {record.kid_name}
                    </div>
                    <label className={record.attended? 'attendence-check-btn isChecked' : 'attendence-check-btn notChecked'}> 
                        <input type="radio" name = {record.kid_id} value="true" 
                        onChange={()=>this.handleAttended({...record,attended:true})}
                        checked={record.attended}/>
                        <i className="fa-solid fa-check"></i>
                        </label>
                    <label className={!record.attended? 'attendence-check-btn isChecked' : 'attendence-check-btn notChecked'}> 
                        <input type="radio" name = {record.kid_id} value="false"
                        onChange={()=>this.handleAttended({...record,attended:false})}
                        checked={!record.attended}/>
                        <i className="fa-solid fa-xmark"></i>
                    </label>
                </div>
                )
            })}
          </div>
      </div>
    )
  }
}
