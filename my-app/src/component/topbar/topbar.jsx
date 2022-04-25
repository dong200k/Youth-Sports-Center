import React, { Component } from 'react'
// import { useContext, useEffect, useState } from "react"
import { NavLink } from 'react-router-dom';
import "./topbar.css"
import { GetUserContext, UserContext } from '../../context/UserContext';


export default class topbar extends Component {
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
                        {this.context.user.user_type === "Parent"?
                        <>
                        <NavLink to=""><li className="topListItem"><span>Home</span></li></NavLink>
                        <NavLink to="program">
                            <li className="topListItem"><span>Programs</span>
                                <ul className= "topSubList">
                                    <NavLink to="announcement"><li className= "topSubListItem">Announcement</li></NavLink>
                                    {/* <li className= "topSubListItem">My Program</li> */}
                                </ul>
                            </li>
                        </NavLink>
                        <NavLink to="account"><li className="topListItem"><span>Account/Kids</span></li></NavLink>
                        <NavLink to="message"><li className="topListItem"><span>Message</span></li></NavLink>
                        </>:
                        <>
                        <NavLink to="InstructorProgram"><li className="topListItem"><span>Program</span></li></NavLink>
                        <NavLink to="announcement"><li className="topListItem"><span>Accouncement</span></li></NavLink>
                        <NavLink to="message"><li className="topListItem"><span>Message</span></li></NavLink>
                        </>
                        }

                    </ul>
                </div>
                {/* <div className={`topLogo ${this.state.isUnfold ? '' : 'active'}`}>
                    Youth Sport Center
                </div> */}
                <div className="topProfile">
                    {this.state.open && (
                    <div className='topListItem' style={{position:"absolute", top:"0", right:"60px"}} onClick={this.context.logout}>
                        Log Out
                    </div>
                    )}
                    <img className="topImg" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" onClick={this.onImageClick}></img>
                </div>
            </div>
        )
    }
}

// export default function topbar(props) {
//     const context = UserContext;

//     const user_type = props.user_type||GetUserContext().user.user_type

//     const [isUnfold, setFold] = useState(true);

//     const [open, setLogout] = useState(true)

//     const onImageClick = () => {
//         setLogout(!open)
//     };

//     return (
//         <div className="topbar">
//             <div className={`topToggle ${isUnfold ? 'close' : ''}`}
//             onClick={() => {
//                 setFold(!isUnfold)
//             }}></div>
//             <div className={`topNavbar ${isUnfold ? '' : 'hidden'}`}>
//                 <ul className="topList">
//                     {user_type === "parent"?
//                     <>
//                     <NavLink to=""><li className="topListItem"><span>Home</span></li></NavLink>
//                     <NavLink to="program">
//                         <li className="topListItem"><span>Programs</span>
//                             {/* <ul className= "topSubList">
//                                 <li className= "topSubListItem">Available Program</li>
//                                 <li className= "topSubListItem">My Program</li>
//                             </ul> */}
//                         </li>
//                     </NavLink>
//                     <NavLink to="account"><li className="topListItem"><span>Account/Kids</span></li></NavLink>
//                     <NavLink to="message"><li className="topListItem"><span>Message</span></li></NavLink>
//                     </>:
//                     <>
//                     <NavLink to="program"><li className="topListItem"><span>Program</span></li></NavLink>
//                     <NavLink to="announcement"><li className="topListItem"><span>Accouncement</span></li></NavLink>
//                     <NavLink to="message"><li className="topListItem"><span>Message</span></li></NavLink>
//                     </>
//                     }

//                 </ul>
//             </div>
//             <div className={`topLogo ${isUnfold ? '' : 'active'}`}>
//                 Youth Sport Center
//             </div>
//             <div className="topProfile">
//             {
//                 <img className="topImg" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" onClick={onImageClick}></img>
//             }
//                 {open && (
//                 <div className='dropDown'>
//                     <ul>
//                         <li onClick={context.logout}>Log Out</li>
//                     </ul>
//                 </div>
//                 )}
//             </div>
//         </div>
//     )
// }