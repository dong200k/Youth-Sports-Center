import React, {useState} from 'react'
import Program from './Program';
import ProgramForm from './ProgramForm'


function ProgramList() {
    const [programs, setPrograms] = useState([]);

    const addProgram = program => {
        if (!program.text || /^\s*$/.test(program.text)) {
            return;
        }

        const newPrograms = [program, ...programs];

        setPrograms(newPrograms);
    };

    const updateProgram = (programId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setPrograms(prev => prev.map(item => (item.id === programId ? newValue : item))
        );
    };

    const removeProgram = id => {
        const removeArr = [...programs].filter(program => program.id !== id);

        setPrograms(removeArr);
    };
    
    

    const completeProgram = id => {
        let updatedPrograms = programs.map(program => {
            if (program.id === id) {
                program.isComplete = !program.isComplete
            }
            return program;
        });
        setPrograms(updatedPrograms);
    };
  return (
    <>
        <h1>Add Classes/Programs Here</h1>
        <ProgramForm onSubmit = {addProgram} />
        <Program 
            programs = {programs} 
            completeProgram = {completeProgram} 
            removeProgram = {removeProgram}
            updateProgram = {updateProgram}/>
    </>
  );
}

export default ProgramList;