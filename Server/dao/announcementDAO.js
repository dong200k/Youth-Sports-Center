import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId
let announcement

//create/post announcement
//update/put announcement
//read/get announcement
export default class AnnouncementDao{
    static async injectDB(conn){
        // if we have the annoucement collection return
        if (announcement)
            return
        try{
            //wait for mongodb then grab announcement collection
            announcement = await conn.db().collection(process.env.ANNOUNCEMENT_COLLECTION)
            console.log("AnnouncementDao injectDB success!")
        }catch(e){
            console.log("Error connecting to collection in AnnouncementDao")
            // console.log(e);
        }
    }
    static async createAnnouncement(sender_id, program_id, message, title){
        try{
            //new announcement document
            let doc = {
                sender_id: ObjectId(sender_id),
                program_id: ObjectId(program_id),
                message: message,
                title: title, 
                date: new Date()
            }
            //insert document
            return await announcement.insertOne(doc)
        } catch (e) {
            console.error(`Unable to create announcement: ${e}`)
            return { error: e }
        }
    }
    static async updateAnnouncement(id, user_id, message, title, date){
        try{
            //filter out the announcement to update
            let filter = {_id: ObjectId(id), sender_id: ObjectId(user_id)}
            //content to update
            let updateDoc = {"$set":{message:message, title: title, date: date}}
            
            return await announcement.updateOne(filter, updateDoc)
        }catch(e){
            console.error(`Unable to update announcement: ${e}`)
            return { error: e }
        }
    }
    static async getProgramAnnouncement(program_id){// returns array of announcements/empty
        try{
            let query = {program_id: ObjectId(program_id)}
            let cursor = await announcement.find(query).sort()
            //returns array of announcements
            let arr = await cursor.toArray()
            arr.sort((a,b)=>{
                //sort from latest to oldest
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            return arr
        }catch(e){
            console.error(`Unable to find announcement: ${e}`)
            //return empty array
            return []
        }
    }       
    static async getAllAnnouncement(){// returns array
        try{
            let query = {}
            let cursor = await announcement.find(query)
            //returns array of announcements
            let arr = await cursor.toArray()
            arr.sort((a,b)=>{
                //sort from latest to oldest
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            return arr
        }catch(e){
            console.error(`Unable to find announcement: ${e}`)
            //return empty array
            return []
        }
    }   
    static async getParentAnnouncement(program_ids){// returns array
        try{
            let query = {
                program_id: {
                    "$in": program_ids.map(id=>ObjectId(id))
                }
            }
            let cursor = await announcement.find(query)
            //returns array of announcements
            let arr = await cursor.toArray()
            arr.sort((a,b)=>{
                //sort from latest to oldest
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            return arr
        }catch(e){
            console.error(`Unable to find parent announcement: ${e}`)
            //return empty array
            return []
        }
    }   
    static async getInstructorAnnouncement(user_id){
        try {
            //get announcement based on sender_id/instructor id
            const filter = {
                sender_id: ObjectId(user_id)
            }

            //returns array of announcements
            let cursor = await announcement.find(filter)
            let arr = await cursor.toArray()
            arr.sort((a,b)=>{
                //sort from latest to oldest
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            return arr

        } catch (e) {
            console.error(`unable to get announcements for instructor ${e}`)
            return []
        }
    }
    static async findById(_id){
        try {
            //get announcement by id
            let cursor = await announcement.find({_id: ObjectId(_id)})
            return await cursor.toArray()

        } catch (e) {
            console.error(`unable to get announcements for instructor ${e}`)
            return []
        }
    }
}  