import React, { Component } from 'react'
import "./login.css"
import football from "../../assets/football.jpg"
import basketball from "../../assets/kidbasket.jpg"

export default class login extends Component {

    state = {
        isNewUser: true,
        role: "",
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
                    <form className="loginMainBoxForm">
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
                            <label className={`loginSelectBox ${this.state.role=="parent" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="parent"
                                    onChange={(event) => {
                                        this.setRole(event);
                                    }}/>I'm parent</label>
                            
                            <label className={`loginSelectBox ${this.state.role=="instructor" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="instructor"
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
                        <form className="loginMainBoxForm">
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
                            <label className={`loginSelectBox ${this.state.role=="parent" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="parent"
                                    onChange={(event) => {
                                        this.setRole(event);
                                    }}/>I'm parent</label>
                            
                            <label className={`loginSelectBox ${this.state.role=="instructor" ? 'isChecked' : 'notChecked'}`}> 
                                <input type="radio" name = "role" value="instructor"
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

