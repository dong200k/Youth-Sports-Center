import axios from "axios"

class MessengerService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    createGroup(data){
        return axios.post(this.baseURL + "/group/create", data)
    }
    getGroup(id){
        return axios.get(this.baseURL + "/group/" + id)
    }
    getMessages(id){
        return axios.get(this.baseURL + "/message/" + id) 
    }
    sendMessage(data){
        return axios.post(this.baseURL + "/message/post", data) 
    }
}

export default new MessengerService()