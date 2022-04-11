import React, { Component } from 'react'
import "./addKid.css"

export default class addKid extends Component {

    constructor(props){
        super(props)
        this.addKid = this.addKid.bind(this)
    };

    state = {
        isAdding: false,
        kid: {
            first_name: "",
            last_name: "",
            birth_date: "",
            gender: "",
            medical_issues: "",
            programs:[],
        },
    }

    handleInput(key){
        return (e) =>{
          let kid = {}
          for(const key in this.state.kid){
            kid[key] = this.state.kid[key]
          }
          kid[key] = e.target.value
          this.setState({
            kid: kid
          })
        }
    }

    async addKid(e){
        e.preventDefault()
        let success = await this.props.addKid(this.state.kid)
        if(success){
            this.setState({
                isAdding: false,
                kid: {
                    first_name: "",
                    last_name: "",
                    birth_date: "",
                    gender: "",
                    medical_issues: "",
                    programs:[],
                }
            })
        }
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
                <form action="" className="inputForm" onSubmit={this.addKid}>
                    <div className="inputTitle">
                        Provide Your kid's Information
                    </div>
                    <div className="inputRow">
                        <label className="inputLabel">
                            First Name: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Name"
                                value={this.state.kid.first_name}
                                onChange={this.handleInput("first_name")}
                            />
                        </label>
                    </div>
                    <div className="inputRow">
                        <label className="inputLabel">
                            Last Name: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                value={this.state.kid.last_name}
                                placeholder="Name"
                                onChange={this.handleInput("last_name")}
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
                                value={this.state.kid.gender}
                                onChange={this.handleInput("gender")}
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
                                value={this.state.kid.birth_date}
                                onChange={this.handleInput("birth_date")}
                            />
                        </label>
                    </div>  
                    {/* <div className="inputRow">
                        <label className="inputLabel">
                            Phone: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Phone Number"
                        
                            />
                        </label>
                    </div>    */}
                    <div className="inputRow">
                        <label className="inputLabel">
                            Medical Issue: 
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                placeholder="Attention"
                                value={this.state.kid.medical_issues}
                                onChange={this.handleInput("medical_issues")}
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
