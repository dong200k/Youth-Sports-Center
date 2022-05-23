import React, { Component } from 'react'
import CalendarHeader from './CalendarHeader'
import { v4 as uuidv4 } from "uuid"
import './calendar.css'
import CalendarCol from './CalendarCol'
import programService from '../../services/program.service.js';
import KidService from "../../services/kid.service.js"
import { UserContext } from '../../context/UserContext';

let weekdayLabel = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let currentListIndex = 0
let hourList= ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
export default class Calendar extends Component {
    static contextType = UserContext

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.initDate()
        this.getKidProgram()
        this.getKids()
    }

    state = {
        kids:[],
        //One week date
        currentList:[
            {cDate: "04", cMonth: "04", cYMD: "2022-04-04", cYear: 2022},
            {cDate: "05", cMonth: "04", cYMD: "2022-04-05", cYear: 2022},
            {cDate: "06", cMonth: "04", cYMD: "2022-04-06", cYear: 2022},
            {cDate: "07", cMonth: "04", cYMD: "2022-04-07", cYear: 2022},
            {cDate: "08", cMonth: "04", cYMD: "2022-04-08", cYear: 2022},
            {cDate: "09", cMonth: "04", cYMD: "2022-04-09", cYear: 2022},
            {cDate: "10", cMonth: "04", cYMD: "2022-04-10", cYear: 2022},
        ],
        currentMonth:'',
        currentYear:'',
        currentDate:'',
        kidFilter:{
            id:'',
            name:''
        },
        programs:[],
        filterPrograms:[]
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

    handleFilter = (filter) =>{
        const filterPrograms = []
        //change the program list
        this.state.programs.map((program)=>{
            if(program.kids.includes(filter.id)){
                filterPrograms.push(program)
            }
        })
        this.setState({kidFilter:filter,filterPrograms:filterPrograms})
    }

    getKidProgram = () => {
        const user_id = this.context.user._id
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
    }

    
    getBirthDate = (d)=>{
        let date = new Date(d)
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        let yyyy = date.getFullYear()
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm; 
        return dd + "/" + mm + "/"+ yyyy
    }

    getKids = () => {
        const user_id = this.context.user._id
        //get kid
        KidService.getKids(user_id)
        .then(res=>{
            if(res.data.status==="success"){
                const kids = res.data.kids
                for(const i in kids){
                    kids[i].birth_date = this.getBirthDate(kids[i].birth_date)
                }
                const kidFilter = {id:kids[0]._id, name:kids[0].first_name+' '+kids[0].last_name}
                this.setState({kids: kids})
                this.handleFilter(kidFilter)
            }
        })
        .catch(err=>{
            console.log(err)
            console.log("error fetching kids")
        })


    }


  render() {
    let changeTime = true;
    return (
      <div className="calendar">
        <CalendarHeader kids={this.state.kids} handleFilter={this.handleFilter} filter={this.state.kidFilter} currentList={this.state.currentList} nextClick={this.nextClick} prevClick={this.prevClick}/>
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
                    <CalendarCol 
                      programs={this.state.filterPrograms}
                      kids={this.state.kids}
                      filter = {this.state.kidFilter}
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
