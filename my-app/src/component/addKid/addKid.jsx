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
        <div className={`addKid ${this.state.isAdding ? 'unfold' : ''}`}>
            <div className={`addKid-addbtn ${this.state.isAdding ? 'unshow' : ''}`}
                onClick={() => {
                    this.setState({
                        isAdding: true
                    });
                }}
            >
                <i className="fa-solid fa-plus" />
            </div>
            <div className={`addKid-main ${!this.state.isAdding ? 'unshow' : 'show'}`}>
                <form action="" className="addKid-form" onSubmit={this.addKid}>
                    <div className="inputTitle">
                        Provide Your kid's Information
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
                    <div className="inputRow">
                        <label className="inputLabel">
                            First Name: 
                        </label>
                        <input
                            className="loginMainBoxInput"
                            type="text"
                            placeholder="Name"
                            value={this.state.kid.first_name}
                            onChange={this.handleInput("first_name")}
                        />

                        <label className="inputLabel" style={{marginLeft:'30px'}}>
                                Last Name: 
                            </label>
                            <input
                                className="loginMainBoxInput"
                                type="text"
                                value={this.state.kid.last_name}
                                placeholder="Name"
                                onChange={this.handleInput("last_name")}
                        />

                    </div>
                    <div className="inputRow">
                        <label className="inputLabel">
                            Gender: 
                        </label>
                        <input
                            className="loginMainBoxInput"
                            type="text"
                            placeholder="Gender"
                            value={this.state.kid.gender}
                            onChange={this.handleInput("gender")}
                        />

                        <label className="inputLabel" style={{marginLeft:'30px'}}>
                            Birthday: 
                        </label>
                        <input
                            className="loginMainBoxInput"
                            type="text"
                            placeholder="DOB"
                            value={this.state.kid.birth_date}
                            onChange={this.handleInput("birth_date")}
                        />
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

                        </label>
                        <input
                            className="loginMainBoxInput"
                            type="text"
                            placeholder="Allergy etc.."
                            value={this.state.kid.medical_issues}
                            onChange={this.handleInput("medical_issues")}
                        />
                    </div>
                    <button
                        className="submitButton">
                        Link A New Kid
                    </button>                                                       
                </form>
            </div>

        </div>
        )
    }
}
