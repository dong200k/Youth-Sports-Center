import React from 'react'
import Header from './header'
import Cards from './cards'
import { useState } from "react"
import Button from './button'

function Announcements(){
  return (
    <div className="annoucement">
        <Header/>
        <Button/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
    </div>
  )
}

export default Announcements