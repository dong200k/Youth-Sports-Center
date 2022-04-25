import React, { Component } from 'react'
import "./profile.css"

export default class profile extends Component {
    constructor(props){
        super(props)
        this.handleInput = this.handleInput.bind(this)
        // console.log(this.context)
        this.state = {
            isEdit: false,
            User: {
                image: "",
                "first name": this.props.user["first name"],
                "last name": this.props.user["last name"],
                email: this.props.user.email,
                // address:"54-45th Street",
                phone: this.props.user.phone,
                // kids: {}
            }
        };
        this.updateUser = this.updateUser.bind(this)
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleInput(key){
        return (e) =>{
          let user = {}
          for(const key in this.state.User){
            user[key] = this.state.User[key]
          }
          user[key] = e.target.value
          this.setState({
              User: user
          })
        }
    }

    async updateUser(e){
        if (this._isMounted) {
            e.preventDefault()
            let success = await this.props.updateUser(this.state.User)
            if(success){
                this.setState({
                    isEdit: false
                })
            }
        }
    }
    

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
                        {Object.keys(this.props.user).map(k => (k === "_id") ? null : ( 
                            <div className="profileText" key={this.props.user[k]} >
                                <label>{k}</label> <span>{this.props.user[k]}</span>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={this.updateUser} action="" className={`profileEdit ${!this.state.isEdit ? 'hidden' : ''}`}>
                        {Object.keys(this.state.User).map(k => (k === "kids" || k === "image") ? null : ( 
                            <div className="profileFormItem" key={k}>
                                <label htmlFor="fileInput">
                                    {k}
                                </label>
                                <input className="profileInput" type={k} id={k} 
                                    value={this.state.User[k]}
                                    onChange={this.handleInput(k)}>
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
