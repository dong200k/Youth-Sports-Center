//import logo from './logo.svg';
import './App.css';
import React from 'react'
//import ProgramForm from './components/ProgramForm'
import ProgramList from './ProgramList';
//import Topbar from './component/topbar/topbar';
//import Attendance from './attendance/Attendance';


function App() {
  return (
    <div className="program-app">
      <h1>Program List</h1>
      <ProgramList />
      
      
    </div>
  );
}

export default App;
