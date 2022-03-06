import React, { Component } from 'react'
import "./topbar.css"

export default class topbar1 extends Component {
    state = {
        isUnfold: true,
    };
    render() {
        return (
            <div className="topbar">
                <div className={`topToggle ${this.state.isUnfold ? 'close' : ''}`}
                onClick={() => {
                    this.setState({
                        isUnfold: !this.state.isUnfold
                    });
                }}></div>
                <div className={`topNavbar ${this.state.isUnfold ? '' : 'hidden'}`}>
                    <ul className="topList">
                        <li className="topListItem"><span>Home</span></li>
                        <li className="topListItem"><span>Programs</span>
                            <ul className= "topSubList">
                                <li className= "topSubListItem">Available Program</li>
                                <li className= "topSubListItem">My Program</li>
                            </ul>
                        </li>
                        <li className="topListItem"><span>Account/Kids</span></li>
                        <li className="topListItem"><span>Message</span></li>
                    </ul>
                </div>
                <div className={`topLogo ${this.state.isUnfold ? '' : 'active'}`}>
                    Youth Sport Center
                </div>
                <div className="topProfile">
                {
                    <img className="topImg" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""></img>
                }
                </div>
            </div>
        )
    }
}