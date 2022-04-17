import React, { Component } from 'react'
import CalendarHeader from './CalendarHeader'
import { v4 as uuidv4 } from "uuid"
import './calendar.css'
import CalendarCol from './CalendarCol'

let weekdayLabel = ["Monday", "Tuesday", "Wesdnesday", "Thursday", "Friday", "Saturday", "Sunday"]
let currentListIndex = 0
let hourList= ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
export default class Calendar extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.initDate()
    }

    state = {
        kids:[
            {
                name:'Lun',
                programs:[
                    {
                        name: 'Soccor',
                        _id:'',
                        start_date:'2022-04-04',
                        end_date:'2022-04-18',
                        days:['Monday','Wesdnesday'],
                        start_time:55,
                        end_time:70
                    }
                ]
            }
        ],
        currentList:[
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
        ],
        currentMonth:'',
        currentYear:'',
        currentDate:'',
    }


    initDate = () =>{
        let date = new Date()
        let cYear = date.getFullYear()
        let cMonth = this.format(date.getMonth() + 1)
        let cDate = this.format(date.getDate())
        let currentDay = date.getDay()
        let cYMD = `${cYear}-${cMonth}-${cDate}`
        this.setState({currentDate:cYMD})
        this.createDate(-currentDay)
    }

    createDate = (cDay) =>{
        let currDlist = []
        for(var i = cDay+1 ; i <= cDay + 7; i++){
            currDlist.push(this.countTime(i))
        }
        this.setState({currentList: currDlist, 
                    currentMonth: currDlist[0].cMonth,
                    currentYear: currDlist[0].cYear
        })
        
    }

    format = (num) =>{
        var f = num < 10 ? '0' + num : num;
        return f
    }

    countTime = (n) => {
        let date = new Date();
        let getTime = date.getTime() + (24*60*60*1000) *(n);
        let needDate = new Date(getTime);
        let getYear = needDate.getFullYear();
        let getMonth = this.format(needDate.getMonth() + 1);
        let getDate = this.format(needDate.getDate());
        let obj ={
            'cYear' : getYear,
            'cMonth' : getMonth,
            'cDate' : getDate,
            'cYMD' : `${getYear}-${getMonth}-${getDate}`
        };
        return obj
    }

    changeWeek = (weekNum)=> {
        let date = new Date()
        let currenDay = date.getDay()
        this.createDate(-currenDay + (7* weekNum))
    }

    prevClick = () =>{
        currentListIndex--
        this.changeWeek(currentListIndex)
    }

    nextClick = () => {
        currentListIndex++
        this.changeWeek(currentListIndex)
    } 

    selectTime = (item) =>{
        this.setState(
            {currentDate: item.cYMD}
        )
    }

    changeCurTab = (date) =>{
        if(this.state.currentDate === date.cYMD){
            return 'item active'
        } else{
            return 'item'
        }
    }
  render() {
    let changeTime = true;
    return (
      <div className="calendar">
        <CalendarHeader currentList={this.state.currentList} nextClick={this.nextClick} prevClick={this.prevClick}/>
        <div className = "calendar-body">
            <div className = "calendar-body-time">
                <div className="time-icon">
                    <i className="fa-solid fa-clock"></i>
                </div>
                { 
                hourList.map((hour)=>{
                    changeTime = !changeTime
                    return(
                        <div className={changeTime?"time-label":"time-label changecolor"}
                         key={uuidv4()}>
                            {hour}
                        </div>    
                    )

                })}
            </div>
            {weekdayLabel.map((weekday, index)=>{
                return(
                    <CalendarCol kids={this.state.kids}
                      currentDate={this.state.currentDate}
                      date={this.state.currentList[index]}
                      weekday={weekday} hourList={hourList} key={uuidv4()}/>
                )
                index++
            })}
            
        </div>
      </div>
    )
  }
}
