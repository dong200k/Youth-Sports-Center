import render from "react"
import KidCard from "../../component/kidCard/kidCard.jsx"
import Profile from "../../component/profile/profile.jsx"
import runningtracks from "../../assets/runningtracks.jpg"
import "./account.css"

export default function AccountKids(){
    return (
        <div className="accountPage">
            <div className="accountMainbox">
                <Profile/>
                <KidCard/>
            </div>
        </div>
    )
}