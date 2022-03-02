import axiosInstance from "axios"
class AuthService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
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