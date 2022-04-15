import React, {useState, useEffect, useRef} from 'react'

function ProgramForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value: '');
    const [input1, setInput1] = useState(props.edit ? props.edit.value: '');
    const [input2, setInput2] = useState(props.edit ? props.edit.value: '');
    const [input3, setInput3] = useState(props.edit ? props.edit.value: '');
    const [input4, setInput4] = useState(props.edit ? props.edit.value: '');
    const [input5, setInput5] = useState(props.edit ? props.edit.value: '');
    const [input6, setInput6] = useState(props.edit ? props.edit.value: '');
    const [input7, setInput7] = useState(props.edit ? props.edit.value: '');



    const focusOn = useRef(null)

    useEffect(() => {
        focusOn.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() *10000),
            text: input
        });

        setInput('');
    };

    const handleChange1 = e => {
        setInput1(e.target.value);
    };

    const handleSubmit1 = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() *10000),
            text: input
        });

        setInput1('');
    };

  return (
    <form className = 'program-form' onSubmit = {handleSubmit}>
        {props.edit ? (
            <>
                <input 
                    placeholder = "'Upadte class information"
                    value = {input}
                    onChange = {handleChange}
                    name = 'text'
                    ref = {focusOn}
                    className='program-input'/>

                <button onClick = {handleSubmit}className 
                = 'program-button edit'>Update</button>
            </>
        ) : (

            <>

                <div>
                    <input 
                        type = 'text'
                        placeholder = 'Add Class' 
                        value = {input}
                        name = 'text'
                        className='program-input'
                        onChange = {handleChange}
                        ref = {focusOn}/>
                </div>

                <button onClick = {handleSubmit} className 
                = 'program-button'>Add Class</button>
            </> 
        )}
    </form>
    
  );
}

export default ProgramForm