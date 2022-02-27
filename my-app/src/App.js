import React, { Component } from 'react'
import Topbar from './component/topbar/topbar'
import Login from "./pages/login/login"
import Announcements from './component/announcements/announcements'

export default class App extends Component {
  render() {
    return (
      <div>
        <Announcements/>
      </div>
    )
  }
}
