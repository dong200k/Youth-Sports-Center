import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid"
import { Modal, Row, Col, Form, Button } from 'react-bootstrap'

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
        for (let i = 0; i < kidList.length; i++) {
            for (let y = 0; y < kidList[i].programs.length; y++){
                if(currentDate.localeCompare(kidList[i].programs[y].start_date) >= 0 &&
                currentDate.localeCompare(kidList[i].programs[y].end_date) <= 0 &&
                kidList[i].programs[y].days.includes(currentWeekday)&&
                kidList[i].name == this.props.filter ){
                    let program = {
                        kidName : kidList[i].name,
                        programName: kidList[i].programs[y].name,
                        top: kidList[i].programs[y].start_time*3.5 + 60,
                        height: (kidList[i].programs[y].end_time - kidList[i].programs[y].start_time)*3.5
                    }    
                    programsList.push(program);
                }
            }
        }
        this.setState({...this.state, programsList})
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
                 onClick={()=>{this.setState({showModal:true})}}>
                     {p.programName}
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
  
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
