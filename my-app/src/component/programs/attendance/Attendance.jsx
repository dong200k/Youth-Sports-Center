import React, { Component } from 'react'
import { v4 as uuidv4 } from "uuid"
import Student from '../../attendance/Student';

export default class Attendance extends Component {


    constructor(props){
        super(props);
    }

    state = {
        schedule:["2022-03-28",
            "2022-04-04",
            "2022-04-11",
            "2022-04-18",
            "2022-04-25",
            "2022-05-02"
            ,"2022-05-09"],
        attendance:[
            {kid_id:'', kid_name:'', attended:false},
            {kid_id:'', kid_name:'', attended:false},
            {kid_id:'', kid_name:'', attended:false},
            {kid_id:'', kid_name:'', attended:false},
            {kid_id:'', kid_name:'', attended:false},
            {kid_id:'', kid_name:'', attended:false},
        ],
        date: '2022-04-19',
        filter_date: '2022-04-19',
    }

    componentDidMount(){
        this.initDate();
        this.setState({filter_date:this.state.date})
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
        this.setState({date:cYMD})
    }
    
  render() {
    return (
      <div>Attendance

          <div>
              <ul>
                  {this.state.schedule.map(date => (date.localeCompare(this.state.date) >= 0)? null:
                    (<li key={uuidv4()}>
                          {date}
                    </li>)
                  )}
              </ul>
          </div>
      </div>
    )
  }
}
