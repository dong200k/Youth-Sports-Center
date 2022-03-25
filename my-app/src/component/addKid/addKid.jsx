import React, { Component } from 'react'
import "./addKid.css"

export default class addKid extends Component {

    constructor(props){
        super(props)
    };

    state = {
        isAdding: false,
        newkid: {
            name: "",
            gender: "",
            birthday: "",
            contact: "",
            medical: [
                
            ],
        },
    }

    
    render() {
        return (
        <div className={`buttonContainer ${this.state.isAdding ? 'unfold' : ''}`}>
            <div className={`buttonIcon ${this.state.isAdding ? 'hidden' : ''}`}
                onClick={() => {
                    this.setState({
                        isAdding: true
                    });
                }}
            >
                <i className="fa-solid fa-plus" />
            </div>
            <div className={`inputContainer ${!this.state.isAdding ? 'hidden' : ''}`}>
                <form action="" className="inputForm">
                    <div className="inputTitle">
                        Provide Your kid's Information
                    </div>
                    <div className="inputRow">
                        <label className="inputLabel">
                            Kid Name: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Name"
                            />
                        </label>
                    </div>
                    <div className="inputRow">
                        <label className="inputLabel">
                            Gender: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Gender"
                            />
                        </label>
                    </div>
                    <div className="inputRow">
                        <label className="inputLabel">
                            Birthday: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="DOB"
                            />
                        </label>
                    </div>  
                    <div className="inputRow">
                        <label className="inputLabel">
                            Phone: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Phone Number"
    
                            />
                        </label>
                    </div>   
                    <div className="inputRow">
                        <label className="inputLabel">
                            Medical Issue: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Attention"
                            />
                        </label>
                    </div>
                    <button
                        className="submitButton">
                        Link A New Kid
                    </button>                                                       
                </form>
                <div className="backIcon"
                    onClick={() => {
                        this.setState({
                            isAdding: false
                        });
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
            </div>

        </div>
        )
    }
}
