import {Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react'
import "./createProgram.css"
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import Select from 'react-select'
import age_range from './ranges/age_range.js'
import location_range from './ranges/location_range.js'
import sport_range from './ranges/sport_range.js'
import weekday_range from './ranges/weekday_range.js'
import userService from '../../services/user.service.js'
import programService from '../../services/program.service.js'
import { GetUserContext } from '../../context/UserContext.jsx'
import MultiFilter from '../multiFilter/MultiFilter'
import MyAlert from '../myAlert/MyAlert'

const CreateProgramForm = () => { 
    const user_id = GetUserContext().user._id
    const [program, setProgram] = useState({})
    const [instructors, setInstructors] = useState([])
    const [error, setError] = useState("")

    // const customStyles = {
    //     option: (provided, state) => {
    //         console.log(provided)
    //         return {
    //             ...provided,
    //             // "color": "white",
    //         }
    //     },
    //     control: base => ({
    //         ...base,
    //         fontFamily: 'Times New Roman',
    //         "font-size": "20px",
    //         'font-family':'Quicksand',
    //         'backgroundColor': '#5c646c',
    //         "color": "white",
    //     }),
    //     // control: (provided) => {
    //     //     return {
    //     //         // none of react-select's styles are passed to <Control />
    //     //         ...provided,
    //     //         width: 100,
    //     //         "font-size": "20px",
    //     //         'font-family':'Quicksand',
    //     //         'backgroundColor': '#5c646c',
    //     //         "font-color": "white"
    //     //     }
    //     // },  
    //     singleValue: (provided, state) => {
    //     //   const opacity = state.isDisabled ? 0.5 : 1;
    //     //   const transition = 'opacity 300ms';
      
    //       return { ...provided, color:"white" };
    //     }
    //   }
    
    //fetch instructor names and ids
    useEffect(()=>{
        userService.getInstructors()
            .then(res=>{
                if(res.data.status==="success"){
                    setInstructors(res.data.instructors)
                }
            })
            .catch(e=>console.log(e))
    }, [])

    //post new program
    const handleSubmit = (e)=>{
        e.preventDefault()
        try {
            const hhmmToMins = (hhmm)=>{
                return parseInt(hhmm.substring(0,2))*60 + parseInt(hhmm.substring(3))
            }
            const data = {
                ...program,
                capacity: parseInt(program.capacity),
                waitlist_capacity: parseInt(program.waitlist_capacity),
                instructors: program.instructors.map(instructor=>instructor._id),
                time:{
                    start_date: program.start_date,
                    end_date: program.end_date,
                    start_time: hhmmToMins(program.start_time),
                    end_time: hhmmToMins(program.end_time)
                },
                user_id: user_id
            }
            programService.createProgram(data)
                .then(res=>{
                    if(res.data.status==="success"){
                        console.log("program posted!")
                        console.log(res.data.program)
                        window.location.reload();
                    }
                })
                .catch(e=>setError({message:e.response.data.error}))
        } catch (error) {
            console.log(error)
            setError({message:'Please fill all blank!'})
        }
        
    }

    const handleChange = (input)=>{
        return (e)=>{
            setProgram(prev=>{
                let next = {...prev}
                if(input==="sport_type"||input==="location")
                    next[input] = e.target.text
                else if(input==="ages"||input==="days"||input==="instructors")
                    next[input] = e.map(item=>item.value)
                else
                    next[input] = e.target.value
                return next
            })
        }
    }


  return (
    <Form className='programForm' onSubmit={handleSubmit}>
        {error != '' && <MyAlert error={error} clear={()=>setError('')}/>}
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicProgramName">
                <DropdownButton className='Button' id="dropdown-basic-button" variant="secondary" title={program.sport_type?program.sport_type:"Select Sport"}>
                    {
                        sport_range.map((sport)=>
                            <DropdownItem key={sport} onClick={handleChange("sport_type")}>
                                {sport}
                            </DropdownItem>)
                    }
                </DropdownButton>
            </Form.Group>
            {/* <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicCoach">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Coach"></DropdownButton>
            </Form.Group> */}
            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <DropdownButton className='Button' id="dropdown-basic-button" variant="secondary" title={program.location?program.location:"Select Location"}>
                    {
                        location_range.map((location)=>
                            <DropdownItem key={location} onClick={handleChange("location")}>
                                {location}
                            </DropdownItem>)
                    }
                </DropdownButton>
            </Form.Group>
            {/* <Form.Group style={{display:"flex", flexDirection:"row"}} controlId="formBasicAge">
                <DropdownButton className='Button' id="dropdown-basic-button" title="Select Age Range"></DropdownButton>
            </Form.Group> */}

            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <MultiFilter  type="age" filter_range={age_range} handleChange={handleChange("ages")}/>
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <MultiFilter  type="instructor" filter_range={instructors.map(instructor=>({label: instructor.first_name, value: instructor._id}))} handleChange={handleChange("instructors")}/>
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <MultiFilter  type="days" filter_range={weekday_range} handleChange={handleChange("days")}/>
            </Form.Group>

        </div>
        {/* <Form.Group className="programForm-item" controlId="formBasicLocation">
                <Select
                    options={age_range}
                    // value={program.ages}
                    // isSearchable={true}
                    isMulti={true}      
                    onChange={handleChange("ages")}
                    // styles={customStyles}
                    placeholder="Ages"
                />
        </Form.Group>
        <Form.Group className="programForm-item" controlId="formBasicLocation">
                <Select
                    options={weekday_range}
                    // value={program.days}
                    // isSearchable={false}
                    isMulti={true}
                    onChange={handleChange("days")}
                    placeholder="Days"
                />
        </Form.Group>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <Select
                    options={instructors.map(instructor=>({value: instructor, label: instructor.first_name}))}
                    // value={program.days}
                    // isSearchable={false}
                    isMulti={true}
                    onChange={handleChange("instructors")}
                    placeholder="Instructors"
                />
            </Form.Group>
        </div> */}
        <Form.Group className="programForm-item" controlId="formBasicProgramName">
            <Form.Label className="programForm-label">Program Name</Form.Label>
            <Form.Control className="programForm-input" type="input" placeholder="Enter Program Name" onChange={handleChange("program_name")}/>
        </Form.Group>

        
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicCapacity">
                <Form.Label className="programForm-label">Capacity</Form.Label>
                <Form.Control className="programForm-input" type="number" min="1" placeholder="Enter Class Size" onChange={handleChange("capacity")}/>
            </Form.Group>
            {/* <Form.Group className="programForm-item" controlId="formBasicWaitlistCapacity">
                <Form.Label className="programForm-label">Waitlist Capacity</Form.Label>
                <Form.Control className="programForm-input" type="number" min="0" placeholder="Enter Waitlist Size" onChange={handleChange("waitlist_capacity")}/>
            </Form.Group> */}
        </div>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicStartDates">
                <Form.Label className="programForm-label">Start Date</Form.Label>
                <Form.Control className="programForm-input" type="date" placeholder="2022-01-01" onChange={handleChange("start_date")}/>
            </Form.Group>

            <Form.Group className="programForm-item" controlId="formBasicEndDates">
                <Form.Label className="programForm-label">End Date</Form.Label>
                <Form.Control className="programForm-input" type="date" placeholder="2022-02-01" onChange={handleChange("end_date")}/>
            </Form.Group>
        </div>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicStartTime">
                <Form.Label className="programForm-label">Start Time</Form.Label>
                <Form.Control className="programForm-input" type="time" placeholder="12:00PM" onChange={handleChange("start_time")}/>
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicEndTime">
                <Form.Label className="programForm-label">End Time</Form.Label>
                <Form.Control className="programForm-input" type="time" placeholder="1:00PM" onChange={handleChange("end_time")}/>
            </Form.Group>
        </div>
        <Button className="programForm-submit" variant="primary" type="submit">
            Submit
        </Button>
    </Form>
  )
}

export default CreateProgramForm