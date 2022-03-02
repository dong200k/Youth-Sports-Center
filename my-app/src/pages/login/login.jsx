import React, { Component } from 'react'
import "./login.css"
import football from "../../assets/football.jpg"
import basketball from "../../assets/kidbasket.jpg"
import AuthService from '../../services/services.js'
export default class login extends Component {
    state = {
        isNewUser: true,
        role: "Parent",
        signUpForm: {
            name: "",
            email: "",
            password: ""
        },
        signInForm: {
            email: "",
            password: ""
        }
    };

    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    };
    
    handleLogin(event){
        event.preventDefault();
        let user = {
            email: this.state.signInForm.email,
            password: this.state.signInForm.password,
        }

        AuthService.login(user)
            .then(response=>{
                if(response.data.status!=="success"){
                    console.log(response.data.error)
                    throw(new Error("Login Error"))
                }
                console.log(response.data)
                // this.props.navigate("/")
            })
            .catch((e)=>{
                console.log("error!")
                console.log(e)
            })
    }

    handleRegister(event){
        event.preventDefault();
        let newUser = {
            first_name: this.state.signUpForm.name,
            email: this.state.signUpForm.email,
            password: this.state.signUpForm.password,
            user_type: this.state.role
        }
        console.log(newUser)
        AuthService.register(newUser)
            .then(response=>{
                if(response.data.status!=="success"){
                    console.log(response.data.error)
                    throw(new Error("Registration Error"))
                }
                console.log(response)
                // this.props.navigate("/")
            })
            .catch(e=>{
                console.log("error!")
                console.log(e)
            })
    }

    setSignUp(event, key) {
        let obj = {...this.state.signUpForm};
        obj[key] = event.target.value;
        this.setState(
            {signUpForm: {...obj}
        });
    }

    setSignIn(event, key) {
        let obj = {...this.state.signInForm};
        obj[key] = event.target.value;
        this.setState(
            {signInForm: {...obj}
        });
    }

    setRole(event){
        console.log(event.target.value)
        this.setState({role: event.target.value});
    }
    

    render() {
        return (
            <div className="login">
                {/* color block */}
                <div className={`loginColorBlock ${this.state.isNewUser ? 'left' : 'right'}`}></div>

                {/* The welcome words of sign up page */}
                <div className={`loginSubBox left ${this.state.isNewUser ? 'active fadeIn' : 'inactive fadeOut'}`}>
                    <div className="loginSubContainer">
                        <span className="loginSubContainerTitle">
                            Welcome Back!
                        </span>
                        <span className="loginSubContainerContent">
                            To keep sharing your work with us, please log in.
                        </span>
                        <button onClick={() => {
                            this.setState({
                                isNewUser: !this.state.isNewUser
                            });
                        }}
                        className="loginSubContainerButton">
                            Sign In
                        </button>
                    </div>
                </div>

                {/* the welcome word for log in page  */} 
                <div className={`loginSubBox right ${!this.state.isNewUser ? 'active fadeIn' : 'inactive fadeOut'}`}>
                    <div className="loginSubContainer">
                        <span className="loginSubContainerTitle">
                            Hello, stranger!
                            </span>
                        <span className="loginSubContainerContent">
                            Enter your personal details and start your own portfolio!
                        </span>
                        <button onClick={() => {
                            this.setState({
                                isNewUser: !this.state.isNewUser
                            });
                        }}
                        className="loginSubContainerButton">
                            Sign Up
                        </button>
                    </div>

                </div>

                {/* Create Account */}
                <div className={`loginMainBox SignUp ${this.state.isNewUser ? 'active' : 'inactive moveRight'}`}>
                    <img src={football} alt="" className="loginImg" />
                    <div className="loginMainBoxContainer">
                    <div className="loginMainBoxTitle">
                        Create Account
                    </div>
                    <form className="loginMainBoxForm" onSubmit={this.handleRegister}>
                        <input
                            className="loginMainBoxInput"
                            type="text"
                            placeholder="Name"
                            onInput={(event) => {
                                this.setSignUp(event, 'name');
                            }}
                        />
                        <input
                            className="loginMainBoxInput"
                            type="email"
                            placeholder="Email"
                            onInput={(event) => {
                                this.setSignUp(event, 'email');
                            }}
                        />
                        <input
                            className="loginMainBoxInput"
                            type="password"
                            placeholder="Password"
                            onInput={(event) => {
                                this.setSignUp(event, 'password');
                            }}
                            />

                        <div>
                            <label className={`loginSelectBox ${this.state.role=="Parent" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="Parent" checked={this.state.role==="Parent"}
                                    onChange={(event) => {
                                        this.setRole(event);
                                    }}/>I'm parent</label>
                            
                            <label className={`loginSelectBox ${this.state.role=="Instructor" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="Instructor" checked={this.state.role==="Instructor"}
                                    onChange={(event) => {
                                        this.setRole(event);
                                    }}/>I'm instructor</label>
                        </div>  
                        <button
                            className="loginMainBoxButton">
                            Sign Up
                        </button>
                    </form>
                    </div>
                </div>

                {/* Log In */}
                <div className={`loginMainBox SignIn ${!this.state.isNewUser ? 'active' : 'inactive moveLeft'}`}>
                    <img src={basketball} alt="" className="loginImg" />
                    <div className="loginMainBoxContainer">
                        <span className="loginMainBoxTitle">
                            Youth Sport Center
                        </span>
                        <form className="loginMainBoxForm" onSubmit={this.handleLogin}>
                            <input
                                className="loginMainBoxInput"
                                type="email"
                                placeholder="Email"
                                onInput={(event) => {
                                    this.setSignIn(event, 'email');
                                }}
                                />
                            <input
                                className="loginMainBoxInput"
                                type="password"
                                placeholder="Password"
                                onInput={(event) => {
                                    this.setSignIn(event, 'password');
                                }}
                                />
                        <div>
                            <label className={`loginSelectBox ${this.state.role=="Parent" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="Parent" checked={this.state.role==="Parent"}
                                    onChange={(event) => {
                                        this.setRole(event);
                                    }}/>I'm parent</label>
                            
                            <label className={`loginSelectBox ${this.state.role=="Instructor" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="Instructor" checked={this.state.role==="Instructor"}
                                    onChange={(event) => {
                                        this.setRole(event);
                                    }}/>I'm instructor</label>
                        </div>

                            <button
                                className="loginMainBoxButton">
                                Sign In
                        </button>
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}

