import React, {useState, useEffect, useRef} from 'react'

function ProgramForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value: '');

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
                <input 
                    type = 'text'
                    placeholder = 'Add a class' 
                    value = {input}
                    name = 'text'
                    className='program-input'
                    onChange = {handleChange}
                    ref = {focusOn}/>

                <button onClick = {handleSubmit} className 
                = 'program-button'>Add Class</button>
            </>
        )}
    </form>
  );
}

export default ProgramForm