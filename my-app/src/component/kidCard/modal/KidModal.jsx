import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { UserContext } from '../../../context/UserContext.jsx'
import kidService from '../../../services/kid.service.js'
import Programs from '../../programs/programs'
import programService from '../../../services/program.service.js';
import "./kidModal.css"

export default class KidModal extends Component {
    static contextType = UserContext
    constructor(props){
        super(props)
        this.state = {
            programs:[]
        }
    }

    componentDidMount(){
        this.getKidProgram()
    }
    getKidProgram(){
        const user_id = this.context.user._id
        const kid_id = this.props._id
        // programService.getUserProgram(user._id)
        //     .then(res=>{
        //     if(res.data.status==="success"){
        //         setProgramNames(res.data.programs)
        //     }
        //     })
        //     .catch((e)=>console.log(e))
        // }, [user])

        //********TODO: add loading here****************
        programService.getUserProgram(user_id)
          .then(response=>{
    
            //********TODO: stop loading here****************
            let programs = []
            response.data.programs.map(program => program.kids.includes(kid_id)?programs.push(program):null)
            this.setState({
              programs: programs,
            })
          })
          .catch(err=>{
            this.setState({
              isError: err
            })
            console.log(err)
          })
      }

    //   getKidProgram(){
    //     const kid_id = this.props._id
    //     console.log(this.state.programs)
    //     //fitler by kid
    //     let programList = []
    //     this.state.programs.map(program => program.kids.includes(kid_id)?programList.push(program):null)
    //     console.log(programList)
    //     this.setState({
    //       programs: programList,
    //     })
    //   }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.setModal} dialogClassName="modalSize">
        <Modal.Header closeButton>
          <Modal.Title className="kidModal-title">
            {this.props.first_name}'s Program
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:'Quicksand',fontWeight:'500', fontSize:'20px'}}>
        <Programs programs={this.state.programs}/>
        </Modal.Body>
    </Modal>
    )
  }
}
