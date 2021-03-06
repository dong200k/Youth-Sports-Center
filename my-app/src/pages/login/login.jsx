import React, { Component } from 'react'
import "./login.css"
import football from "../../assets/signup-bg.jpg"
import basketball from "../../assets/signup-bg.jpg"
import AuthService from '../../services/auth.service.js'
import { UserContext } from '../../context/UserContext.jsx'
import MyAlert from '../../component/myAlert/MyAlert'
export default class login extends Component {
    static contextType = UserContext
    
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
        },
        error: '',
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
                    throw(new Error("Login Error"))
                }
                this.context.login(response.data.user)
                // this.props.navigate("/")
            })
            .catch((e)=>{
                console.log(e)
                this.setState({error:e})
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
        AuthService.register(newUser)
            .then(response=>{
                if(response.data.status!=="success"){
                    console.log(response.data.error)
                    throw(new Error("Registration Error"))
                }
                this.setState({        
                    signUpForm: {
                    name: "",
                    email: "",
                    password: ""
                    },
                    isNewUser: false,
                })
                // this.props.navigate("/")
            })
            .catch(e=>{
                this.setState({error:e})
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
        this.setState({role: event.target.value});
    }
    
    clearError = () => {
        this.setState({error:''})
    }

    render() {
        return (
            <div className="login">
                {this.state.error != '' && <MyAlert error={this.state.error} clear={this.clearError}/>}
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
                            Enter your personal details and create your account!
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
                            value={this.state.signUpForm.name}
                            onInput={(event) => {
                                this.setSignUp(event, 'name');
                            }}
                        />
                        <input
                            className="loginMainBoxInput"
                            type="email"
                            placeholder="Email"
                            value={this.state.signUpForm.email}
                            onInput={(event) => {
                                this.setSignUp(event, 'email');
                            }}
                        />
                        <input
                            className="loginMainBoxInput"
                            type="password"
                            placeholder="Password"
                            value={this.state.signUpForm.password}
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