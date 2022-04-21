import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "./topbar.css"
import { UserContext } from '../../context/UserContext';

export default class topbar1 extends Component {
    static contextType = UserContext;
    constructor(props){
        super(props)
    }
    state = {
        isUnfold: true,
        open: false,
    };
    onImageClick = () => {
        this.setState((state) =>{
            return {
                open: !state.open
            };
        });
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
                        <NavLink to=""><li className="topListItem"><span>Home</span></li></NavLink>
                        <NavLink to="program">
                            <li className="topListItem"><span>Programs</span>
                                {/* <ul className= "topSubList">
                                    <li className= "topSubListItem">Available Program</li>
                                    <li className= "topSubListItem">My Program</li>
                                </ul> */}
                            </li>
                        </NavLink>
                        <NavLink to="account"><li className="topListItem"><span>Account/Kids</span></li></NavLink>
                        <NavLink to="message"><li className="topListItem"><span>Message</span></li></NavLink>
                    </ul>
                </div>
                <div className={`topLogo ${this.state.isUnfold ? '' : 'active'}`}>
                    Youth Sport Center
                </div>
                <div className="topProfile">
                {
                    <img className="topImg" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" onClick={this.onImageClick}></img>
                }
                    {this.state.open && (
                    <div className='dropDown'>
                        <ul>
                            <li onClick={this.context.logout}>Log Out</li>
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}