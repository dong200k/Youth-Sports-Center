import React, { Component } from 'react'
import noFound from '../../assets/Not Found.jpg'
import './notFound.css'

export default class notFound extends Component {
  render() {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column',height:'50vh', fontFamily:'Quicksand'}}>
            <i className="fa-solid fa-ban" style={{fontSize:'150px'}}></i>
            <h4 style={{marginTop:'20px'}}> No Programs Found </h4>
            <button
                className="filterClearButton" onClick = {this.props.initailFilter}>
                Remove All Filters
            </button> 
        </div>
    )
  }
}
