import axios from "axios"
class AnnouncementService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    postAnnouncement(data){
        return axios.post(this.baseURL + "/announcement", data)
    } 
    updateAnnouncement(data){
        return axios.put(this.baseURL + "/announcement", data)
    } 
    getProgramAnnouncement(id){
        return axios.get(this.baseURL + "/announcement/id/"+id)
    } 
    getUserAnnouncement(id){
        console.log("userid"+id)
        return axios.get(this.baseURL + "/announcement/user/"+id)
    } 
    // deleteAnnouncement(data){
    //     return axiosInstance.delete(this.baseURL + "/announcement", data)
    // } 
    getAllAnnouncement(){
        console.log("getting all announcements")
        return axios.get(this.baseURL + "/announcement")
    } 
}

export default new AnnouncementService()