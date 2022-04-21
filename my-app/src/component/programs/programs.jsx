import React, { Component } from 'react';
import Program from './program.jsx'
import Loading from '../loading/loading.jsx'
import NotFound from './notFound.jsx';
import './programs.css'

class programs extends Component {
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
        const {programs,isLoad,isError, initailFilter} = this.props;
        return (
            <div className="row programContainer">
                {
                    isLoad ? <Loading /> :
                    this.state.isEmpty ? <NotFound initailFilter={initailFilter}/>:
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