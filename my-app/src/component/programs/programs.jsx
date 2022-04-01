import React, { Component } from 'react';
import Program from './program.jsx'
import Loading from '../loading/loading.jsx'
import './programs.css'

class programs extends Component {
    render() {
        const {programs,isLoad,isError} = this.props;
        return (
            <div className="row programContainer">
                {
                    isLoad ? <Loading /> :
                    isError !== ''? <h1>{isError}</h1> :
                    programs.map((program)=>{
                    return (
                        <Program program={program} key={program._id}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default programs;