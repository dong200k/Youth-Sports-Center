import axiosInstance from "./axios.js";

class AnnouncementService{
    constructor(){
        this.baseURL = "http://localhost:5000/api/v1/youthsportcenter"
    }
    postAnnouncement(data){
        return axiosInstance.post(this.baseURL + "/announcement", data)
    } 
    updateAnnouncement(data){
        return axiosInstance.put(this.baseURL + "/announcement", data)
    } 
    getProgramAnnouncement(id){
        return axiosInstance.post(this.baseURL + "/announcement/id/" + id)
    } 
    getUserAnnouncement(id){
        return axiosInstance.get(this.baseURL + "/announcement/user/id/" + id)
    } 
    // deleteAnnouncement(data){
    //     return axiosInstance.delete(this.baseURL + "/announcement", data)
    // } 
    getAllAnnouncement(data){
        return axiosInstance.get(this.baseURL + "/announcement", data)
    } 

}

export default new AnnouncementService()