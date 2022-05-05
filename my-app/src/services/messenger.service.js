import axios from "axios"
import baseURL from "./baseURL.js"
class MessengerService{
    constructor(){
        // this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
        this.baseURL = baseURL
    }
    createGroup(data){
        return axios.post(this.baseURL + "/group/create", data)
    }
    getGroup(id){
        return axios.get(this.baseURL + "/group/" + id)
    }
    getMessages(id){
        console.log("get messae")
        console.log(id)
        return axios.get(this.baseURL + "/message/" + id) 
    }
    sendMessage(data){
        return axios.post(this.baseURL + "/message/post", data) 
    }
}

export default new MessengerService()