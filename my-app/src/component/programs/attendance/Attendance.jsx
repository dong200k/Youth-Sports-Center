import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid"
import Student from '../../attendance/Student';
import "./attendance.css"

export default class Attendance extends Component {
    constructor(props){
        super(props);
        this._onScrollEvent = this._onScrollEvent.bind(this);  //保证被组件调用时，对象的唯一性
    }

    state = {
        schedule:["2022-03-28",
            "2022-04-04",
            "2022-04-11",
            "2022-04-18",
            "2022-04-18",
            "2022-04-18",
            "2022-04-25",
            "2022-05-02"
            ,"2022-05-09"],
        attendance:[
            {kid_id:'1', kid_name:'Lun1', attended:false},
            {kid_id:'2', kid_name:'Lun2', attended:false},
            {kid_id:'3', kid_name:'Lun3', attended:false},
            {kid_id:'4', kid_name:'Lun4', attended:false},
            {kid_id:'5', kid_name:'Lun5', attended:false},
            {kid_id:'6', kid_name:'Lun6', attended:false},
        ],
        date: '',
        filter_date: '',
        scrollTop: '',
        showFilter: false,
    }      

    componentDidMount(){ 
        this.initDate();
    }

    _onScrollEvent() {
        console.log('chuxian')
        console.log(this._container.scrollHeight)
        if(this.state.filter_date === this.state.date){
            this._container.scrollTop = this._container.scrollHeight
        }
    }

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
        let cYMD = `${cYear}-${cMonth}-${cDate}`

        this.setState({date:cYMD,filter_date:cYMD})
    }
    

    handleFilter = (event) =>{
        this.setState({filter_date:event})
    }

    handleScroll(scrollTop) {
        this.setState({scrollTop: scrollTop});
    }

    componentDidUpdate(){
        if(this.state.filter_date === this.state.date){
            this._container.scrollTop = this._container.scrollHeight
        }
        else{
            this._container.scrollTop = this.state.scrollTop
        }
    }

    handleClick(e){
        this.setState({showFilter:!this.state.showFilter})
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
              Attdendance
          </div>
          <div className="attendance-header">
              <div> Date: {this.state.date}</div>
              <div onClick={()=>this.handleClick()}> {this.state.filter_date} </div>
              <div className={this.state.showFilter?"attendance-filter":"attendance-filter hidden"}>
                  <ul ref={c => this._container = c}>
                    {this.state.schedule.map(date => (date.localeCompare(this.state.date) >= 0)? null:
                        (<li onClick={()=>{this.setState({filter_date:date,scrollTop:this._container.scrollTop,showFilter:false})}} className="attendance-filter-item" key={uuidv4()}>
                            {date}
                        </li>)
                    )}
                  </ul>
              </div>
          </div>
          <div className="attendance-body">
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
