import {Dropdown} from "react-bootstrap"
import {DropdownButton} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import filter from "../programFilter/filter"

const AnnouncementFilter = (props) => {

    // useEffect(()=>{
    //     props.programNames.map((p)=>{
    //         setFilters(
    //             filters
    //         .push(p.program_name)
    //         )
    //     })
    //     console.log(filters)
    // }, [props])

    // const renderFilters = (filter) => {
    //     console.log(currentFilter===filter)
    //     return (
    //         <div className={currentFilter===filter?"announcementFilter-item select":"announcementFilter-item "}
    //         key={uuidv4()} onClick={()=>{
    //             setCurrentFilter(filter)
    //         }}>
    //             {filter}
    //         </div>
    //     );
    // };

    return (
    <div className="announcementFilterBox">
         {/* <DropdownButton className="announcementFilter" id="dropdown-basic-button" title="Filter" >
             {props.programNames.map(({program_name: name},index)=><Dropdown.Item onClick={props.onChangeFilter(name)} href="#/action-1" key={index}>{name}</Dropdown.Item>)}
         </DropdownButton> */}
        {/* {props.announcementInfo.map(renderAnnouncement)} */}
        <div className="announcementFilter">
            {props.programNames.map((program)=>{
                return(
                <div onClick={props.onChangeFilter(program.program_name)}
                className={props.currentFilter.program_name===program.program_name?"announcementFilter-item select":"announcementFilter-item "}
                key={uuidv4()}>
                    {program.program_name}
                </div>)
            })}
        </div>
    </div>
  )
}

export default AnnouncementFilter