import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid"
import { Modal } from 'react-bootstrap'

export default class CalendarCol extends Component {
    state ={
        bgcolorList:[
            "#7AD673",
            "#ffc303",
            "#6ABCFF",
            "#FF8633",
            "#FF99C5",
            "#AEACFA",
        ],
        programsList:[],
        showModal:false,
        modalProgram:{program_name:'', ages:[], days:[], time:{start_date:'', end_date:'',start_time:'',end_time:''}},
        
    }
    constructor(props){
        super(props) 
    }

    componentDidMount(){
        this.todayPrograms()
    }

    //check the start day and end day of kid program
    //if current date is between start and end
    //then check the weekday.
    //if the weekday == this.props.weekday
    //put it into the programslist
    todayPrograms = () =>{
        let programsList = []
        let currentDate = this.props.date.cYMD
        let kidList = this.props.kids
        let currentWeekday = this.props.weekday
        this.props.programs.map(program=>{
          if(currentDate.localeCompare(program.time.start_date.substring(0,10)) >= 0 &&
          currentDate.localeCompare(program.time.end_date.substring(0,10)) <= 0 &&
          program.days.includes(currentWeekday)){
            let todayProgram = {
              ...program,
              top: program.time.start_time*3.5 + 60,
              height: (program.time.end_time - program.time.start_time)*3.5
            }   
            programsList.push(todayProgram)
          }
        })


        // for (let i = 0; i < kidList.length; i++) {
        //     for (let y = 0; y < kidList[i].programs.length; y++){
        //         if(currentDate.localeCompare(kidList[i].programs[y].start_date) >= 0 &&
        //         currentDate.localeCompare(kidList[i].programs[y].end_date) <= 0 &&
        //         kidList[i].programs[y].days.includes(currentWeekday)&&
        //         kidList[i].name == this.props.filter ){
        //             let program = {
        //                 kidName : kidList[i].name,
        //                 programName: kidList[i].programs[y].name,
        //                 top: kidList[i].programs[y].start_time*3.5 + 60,
        //                 height: (kidList[i].programs[y].end_time - kidList[i].programs[y].start_time)*3.5
        //             }    
        //             programsList.push(program);
        //         }
        //     }
        // }
        this.setState({...this.state, programsList})
    }


    getTime = time => {
      let hour = Math.floor(time/60)
      let min = Math.floor(time%60)
      if(hour<10)
        hour = "0"+hour.toString()
      else
        hour = hour.toString()
      if(min<10)
        min = "0"+min.toString()
      else
        min = min.toString()
      return hour+":"+min
    }

  render() {
    return (
      <div className="calendar-col" >
        <div className={this.props.date.cYMD === this.props.currentDate? "weekday-label isCurrent": "weekday-label"}>
            {this.props.date.cYMD.substring(5)} <br/>
            {this.props.weekday}
        </div>
        {this.props.hourList.map((hour)=>{
            return(
                <div className={this.props.date.cYMD === this.props.currentDate? "calendar-grid isCurrent":"calendar-grid"}
                 key={uuidv4()}>
                </div>
            )
        })}
        {this.state.programsList.map((p)=>{
            let topDistance = p.top + 'px'
            let height = p.height + 'px'
            return(
                <div className="calendar-grid-shown" key={uuidv4()}
                 style={{position:'absolute', top:topDistance, height:height}}
                 onClick={()=>{this.setState({showModal:true, modalProgram:p})}}>
                     {p.program_name}
                </div>
            )
        })}
    <Modal
        show={this.state.showModal}
        onHide={() => {
          this.setState({
            showModal: false
          });
        }}
        dialogClassName="modalSize"
      >
        <Modal.Header style={{marginLeft:'2.5%', width:'95%'}} closeButton>
          <Modal.Title style={{position:'absolute', left:'50%', width:'140px', marginLeft:'-70px', textAlign:'center'}}>
            Class Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:'Quicksand',fontWeight:'500', fontSize:'20px'}}>
        <div className="classinfo">
            <div className="classinfo-label">Program:</div>
            <span>{this.state.modalProgram.program_name}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Address:</div>
            <span>{this.state.modalProgram.location}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Session:</div>
            <span>{this.state.modalProgram.time.start_date.substring(0,10)}~{this.state.modalProgram.time.end_date.substring(0,10)}</span>
          </div>
          <div className="classinfo">
            <div className="classinfo-label">Schedule:</div>
            <span>{this.state.modalProgram.days.map(day=><span key={uuidv4()}> {day.substring(0,2)} </span>)}| {this.getTime(this.state.modalProgram.time.start_time)}
              ~{this.getTime(this.state.modalProgram.time.end_time)}</span>
          </div>
          {/* <div className="classinfo">
            <div className="classinfo-label">Coach:</div>
            <span>{this.props.program.instructors.map((i)=>{
                return(<span key={uuidv4()}> {i.first_name} ;</span>)
              })
              }</span>
          </div> */}
          <div className="classinfo" style={{ paddingBottom:"20px", borderBottom: "1px solid rgb(221, 219, 219)"}}>
            <div className="classinfo-label">Age range:</div>
            <span>{this.state.modalProgram.ages.map((age)=>{
                return(<span key={uuidv4()}> {age} </span>)
              })
              }</span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    )
  }
}
