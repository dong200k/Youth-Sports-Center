import {Dropdown} from "react-bootstrap"
import {DropdownButton} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

const FilterButton = () => {
    return (
    <div>
        <DropdownButton className= "Button" id="dropdown-basic-button" title="Filter">
            <Dropdown.Item href="#/action-1">Date Posted</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Program Name</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Program Date</Dropdown.Item>
        </DropdownButton>
    </div>
  )
}

export default FilterButton