import React, { Component } from 'react'
import "./profile.css"

export default class profile extends Component {
    state = {
        isEdit: false,
        User: {
            image: "",
            name: "Lun Qu",
            email: "123456@gmail.com",
            address:"54-45th Street",
            phone: "454-4568-1564",
            kids: {}
        }
    };

    render() {
        return (
            <div className="profileContainer">
                <div className="profileImg">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                    <form action="" className="profileChangeImg">
                        <label htmlFor="fileInput">Change Photo</label>
                        <input type="file" id="fileInput" style={{display: "none"}}/>
                    </form>
                </div>
                <div className="profileMain">
                    <div className="profileNav">
                        <ul className="profileNavList">
                            <li className={`profileNavItem ${!this.state.isEdit ? 'chosen' : ''}`}
                                onClick={() => {
                                    this.setState({
                                        isEdit: false
                                    });
                                }}
                            >
                                About
                            </li>
                            <li className={`profileNavItem ${this.state.isEdit ? 'chosen' : ''}`}
                                onClick={() => {
                                    this.setState({
                                        isEdit: true
                                    });
                                }}
                            >
                                Edit
                            </li>
                        </ul>
                    </div>
                    <div className= {`profileContent ${this.state.isEdit ? 'hidden' : ''}`}>
                        {Object.keys(this.state.User).map(k => (k === "kids" || k === "image") ? null : ( 
                            <div className="profileText" key={this.state.User[k]} >
                                <label>{k}</label> <span>{this.state.User[k]}</span>
                            </div>
                        ))}
                    </div>
                    <form action="" className={`profileEdit ${!this.state.isEdit ? 'hidden' : ''}`}>
                        {Object.keys(this.state.User).map(k => (k === "kids" || k === "image") ? null : ( 
                            <div className="profileFormItem" key={k}>
                                <label htmlFor="fileInput">
                                    {k}
                                </label>
                                <input className="profileInput" type={k} id={k} >
                                </input>
                            </div>
                        ))}
                        <button className="profileSubmit button-53">
                            Submit
                        </button>
                    </form>
                </div>

        </div>
        )
    }
}
