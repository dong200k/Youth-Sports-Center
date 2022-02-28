import axios from "axios"

class AuthService{
    login(data){
        // console.log("in login auth")
        // console.log(data)
        // return axios.post("/login", data)
        // const baseUrl = "http://localhost:5000/api/v1/youthsportcenter/register"
        // axios
        //     .post(baseUrl, )
        //     .then((response) => {
        //         console.log(response)
        //     });
    }
    register(data){
        return axios.post("/register", data)
    }
}

export default new AuthService()