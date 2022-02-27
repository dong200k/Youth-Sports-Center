import React from 'react'
import Header from './header'
import Cards from './cards'
import { useState } from "react"

function Announcements(){
  return (
    <div>
        <Header/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
    </div>
  )
}

export default Announcements