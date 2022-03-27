import React, {useState} from 'react'
import ProgramForm from './ProgramForm'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {TiEdit} from 'react-icons/ti'

const Program = ({programs, completeProgram, removeProgram, updateProgram}) => {
    const [edit, setEdit] = useState({
        id: null, 
        value: ''
    });

    const submitUpdate = value =>{
        updateProgram(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    if(edit.id){
        return <ProgramForm edit = {edit} onSubmit = {submitUpdate}/>
    }
  return programs.map((program, index) => (
      <div className = {program.isComplete ? 'program-row complete' :
     'program-row'} key = {index}>
         <div key = {program.id} onClick = {() => completeProgram(program.id)}>
             {program.text}
         </div>
         <div className = "icons">
             <AiOutlineCloseCircle 
             onClick = {() => removeProgram(program.id)}
             className = 'delete-icon'/>
             <TiEdit 
             onClick = {() => setEdit({id: program.id, value: program.text})}
             className = 'edit-icon'/>
         </div>
     </div>
  ));
};

export default Program;