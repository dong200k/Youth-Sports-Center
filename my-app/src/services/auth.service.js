import axiosInstance from "axios"
import baseURL from "./baseURL.js"
class AuthService{
    constructor(){
        // this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
        this.baseURL = baseURL
    }
    login(data){
        // return axios.post("http://localhost:5000/api/v1/youthsportcenter/login", data)
        return axiosInstance.post(this.baseURL + "/login", data)
       
    } 
    register(data){
        return axiosInstance.post(this.baseURL + "/register", data)
    }
}

export default new AuthService()