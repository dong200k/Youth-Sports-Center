import {Dropdown} from "react-bootstrap"
import {DropdownButton} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const AnnouncementFilter = (props) => {

    const [filters, setFilters] = useState([
        "All"
    ].concat(props.programNames)
    );

    const [currentFilter, setCurrentFilter] = useState(
        "All"
    );

    useEffect(()=>{

        setFilters([
            "All","Basketball"
        ].concat(props.programNames)
        )
    }, [props])

    const renderFilters = (filter) => {
        console.log(currentFilter===filter)
        return (
            <div className={currentFilter===filter?"announcementFilter-item select":"announcementFilter-item "}
            key={uuidv4()} onClick={()=>{
                setCurrentFilter(filter)
            }}>
                {filter}
            </div>
        );
    };

    return (
    <div className="announcementFilterBox">
         {/* <DropdownButton className="announcementFilter" id="dropdown-basic-button" title="Filter" >
             {props.programNames.map(({program_name: name},index)=><Dropdown.Item onClick={props.onChangeFilter(name)} href="#/action-1" key={index}>{name}</Dropdown.Item>)}
         </DropdownButton> */}
        {/* {props.announcementInfo.map(renderAnnouncement)} */}
        <div className="announcementFilter">
            {filters.map(renderFilters)}
        </div>
    </div>
  )
}

export default AnnouncementFilter