import axios from "axios"

class UserService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    updateUser(data){
        return axios.put(this.baseURL + "/user", data) 
    } 
    getUser(id){
        return axios.get(this.baseURL + "/user/" + id)
    }
}

export default new UserService()