import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import { v4 as uuidv4 } from "uuid"
import filter from '../programFilter/filter'
import "./multiFilter.css"

export default class MultiFilter extends Component {

    constructor(props){
        super(props)
    }

    state = {
        showModal:false,
        filter_range:[],
        tem_filter:[],
        filter:[],
    }


    handleOpen = () => {
        this.setState({
            showModal:true,
            tem_filter: this.state.filter,
        })
    }

    handleClose = () => {
        this.setState({
            showModal:false,
        })
    }

    handleApply = () => {
        this.setState({
            filter:this.state.tem_filter,
        })
        this.props.handleChange(this.state.tem_filter);
        this.handleClose();
    }

    handleFilter = (item) => {
        if(this.state.tem_filter.includes(item)){
            let filter = []
            filter = this.state.tem_filter.filter(i => i !== item);
            this.setState({
                tem_filter:filter
            })
        }
        else{
            this.setState({
                tem_filter:[...this.state.tem_filter, item]
            })
        }
    }

    handleClear = () => {
        this.setState({
            filter:[],
        })
        this.props.handleChange([]);
        this.handleClose();
    }



  render() {
    return (
      <>
          <button type="button" className={"multifilter-btn"} onClick={this.handleOpen}>
            {this.props.type}
            {this.state.filter.length != 0 &&
                <div className='multifilter-item-check'>
                    <i className="fa-solid fa-circle-check"></i>
                </div>
            }
          </button >
          {this.state.showModal && <Modal show={this.state.showModal} style={{marginTop:"100px"}} dialogClassName="modalSize">
            <div className="multifilter-window">
            <button className="multifilter-close" onClick={this.handleClose}>
                <i className="fa-solid fa-circle-xmark"></i>
            </button>
            <div className="multifilter-header">
                Filters/{this.props.type}
            </div>
            <div className={this.props.type === "age"?"multifilter-body-agefilter": "multifilter-body"}>
                {this.props.filter_range.map(item => {
                    return(
                        <div className={this.state.tem_filter.includes(item)?"multifilter-item filtered":"multifilter-item"} key={uuidv4()} onClick={()=>this.handleFilter(item)}>
                            {(typeof(item) == "object")?item.label:item}
                        </div>
                        )}
                )}
            </div>
            <button className="multifilter-apply" onClick={this.handleApply}>
                apply
            </button>
            {this.state.tem_filter.length != 0 &&
            <button className="multifilter-clear" onClick={this.handleClear}>
                remove filters
            </button>
            }
            </div>
          </Modal>}
          
      </>
    )
  }
}
