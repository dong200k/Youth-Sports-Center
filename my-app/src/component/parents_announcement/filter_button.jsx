import {Dropdown} from "react-bootstrap"
import {DropdownButton} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

const FilterButton = (props) => {
    return (
    <div>
        <DropdownButton className= "Button" id="dropdown-basic-button" title="Filter" >
            {props.programNames.map(({program_name: name},index)=><Dropdown.Item onClick={props.onChangeFilter(name)} href="#/action-1" key={index}>{name}</Dropdown.Item>)}
        </DropdownButton>
    </div>
  )
}

export default FilterButton