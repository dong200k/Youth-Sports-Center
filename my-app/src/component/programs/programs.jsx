import React, { Component } from 'react';
import Program from './program.jsx'
import Loading from '../loading/loading.jsx'
import NotFound from './notFound.jsx';
import './programs.css'
import { v4 as uuidv4 } from "uuid"

class programs extends Component {
    constructor(props){
        super(props)
    }

    state = {
        isEmpty: false
    }

    componentDidUpdate(prevProps){
        if(this.props.programs != prevProps.programs){
            if(this.props.programs.length != 0)
            this.setState({
                isEmpty: false
            })
            else{
                this.setState({
                    isEmpty: true
                })
            }
        } 
    }

    render() {
        return (
            <div className="row programContainer">
                {
                    this.props.isLoad ? <Loading /> :
                    this.state.isEmpty ? <NotFound initailFilter={this.props.initailFilter}/>:
                    this.props.isError !== ''? <h1>{this.props.isError}</h1> :
                    this.props.programs.map((program)=>{
                    return (
                        <Program program={program} key={uuidv4()}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default programs;