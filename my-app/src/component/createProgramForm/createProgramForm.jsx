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

const CreateProgramForm = () => { 
    const [program, setProgram] = useState({
        // program_name: "",
        // instructors: [],
        // days: [], 
        // ages: [],
        // location: "", 
        // sport_type: "", 
        // capacity: "", 
        // waitlist_capacity: "",
        // start_date: "",
        // end_date: 
    })

    const customStyles = {
        
    }
    
    const handleChange = (input)=>{
        return (e)=>{
            e.preventDefault()
            console.log(e.target.text)
            setProgram(prev=>{
                let next = {...prev}
                next[input] = e.target.text
                return next
            })
        }
    }

    useEffect(()=>{
        console.log(program)
    }, [program])

  return (
    <Form className='programForm'>
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
                <Select
                    options={age_range}
                    value={program.ages}
                    isSearchable={false}
                    isMulti={true}      
                    placeholder="Ages"
                />
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicLocation">
                <Select
                    options={weekday_range}
                    value={program.days}
                    isSearchable={false}
                    isMulti={true}
                    onChange={(e)=>console.log(e)}
                    placeholder="Days"
                />
            </Form.Group>
        </div>
        <Form.Group className="programForm-item" controlId="formBasicProgramName">
            <Form.Label className="programForm-label">Program Name</Form.Label>
            <Form.Control className="programForm-input" type="input" placeholder="Enter Program Name" />
        </Form.Group>

        
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicCapacity">
                <Form.Label className="programForm-label">Capacity</Form.Label>
                <Form.Control className="programForm-input" type="number" placeholder="Enter Maximum Class Size" />
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicWaitlistCapacity">
                <Form.Label className="programForm-label">Waitlist Capacity</Form.Label>
                <Form.Control className="programForm-input" type="number" placeholder="Enter Maximum Waitlist Capacity" />
            </Form.Group>
        </div>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicStartDates">
                <Form.Label className="programForm-label">Start Date</Form.Label>
                <Form.Control className="programForm-input" type="date" placeholder="2022-01-01" />
            </Form.Group>

            <Form.Group className="programForm-item" controlId="formBasicEndDates">
                <Form.Label className="programForm-label">End Dates</Form.Label>
                <Form.Control className="programForm-input" type="date" placeholder="2022-02-01" />
            </Form.Group>
        </div>
        <div className="programForm-row">
            <Form.Group className="programForm-item" controlId="formBasicStartTime">
                <Form.Label className="programForm-label">Start Time</Form.Label>
                <Form.Control className="programForm-input" type="time" placeholder="12:00PM" />
            </Form.Group>
            <Form.Group className="programForm-item" controlId="formBasicEndTime">
                <Form.Label className="programForm-label">End Time</Form.Label>
                <Form.Control className="programForm-input" type="time" placeholder="1:00PM" />
            </Form.Group>
        </div>
        <Button className="programForm-submit" variant="primary" type="submit">
            Submit
        </Button>
    </Form>
  )
}

export default CreateProgramForm