import React, { Component } from 'react'
import "./login.css"

export default class newlogin extends Component {
    state = {
        login:  true,
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
    
    render() {
        return (
            <div className="login">
                {/* 颜色块 */}
                <div className={`loginColorBlock ${this.state.login ? 'left' : 'right'}`}></div>

                {/* 注册页面欢迎语 */}
                <div className={`loginSubBox left ${this.state.login ? 'active' : 'inactive'}`}>
                    {/* 左上角logo */}
                    <div className="loginSubContainer">
                        <span className="loginSubContainerTitle">
                            Welcome Back!
                        </span>
                        <span className="loginSubContainerContent">
                            To keep sharing your work with us, please log in.
                        </span>
                        <button onClick={() => {
                            this.setState({
                                login: !this.state.login
                            });
                        }}
                        className="loginSubContainerButton">
                            Sign In
                        </button>
                    </div>
                </div>

                {/* 登录页面欢迎语 */} 
                <div className={`loginSubBox right ${!this.state.login ? 'active' : 'inactive'}`}>
                    <div className="loginSubContainer">
                        <span className="loginSubContainerTitle">
                            Hello, stranger!
                            </span>
                        <span className="loginSubContainerContent">
                            Enter your personal details and start your own portfolio!
                        </span>
                        <button onClick={() => {
                            this.setState({
                                login: !this.state.login
                            });
                        }}
                        className="loginSubContainerButton">
                            Sign Up
                        </button>
                    </div>

                </div>

                {/* 注册页面 */}
                <div className={`loginMainBox SignUp ${this.state.login ? 'active' : 'inactive'}`}>
                    <span className="loginMainBoxTitle">
                        Create Account
                    </span>
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
                        <button
                            className="loginMainBoxButton">
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* 登录页面 */}
                <div className={`loginMainBox SignIn ${!this.state.login ? 'active' : 'inactive'}`}>
                    <span className="loginMainBoxTitle">
                        Title
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
                            <button
                                className="loginMainBoxButton">
                                Sign In
                        </button>
                        </form>

                </div>
            </div>
        );
    }
}

