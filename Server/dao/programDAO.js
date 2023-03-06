import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId
let program
// ***** the DAO, data access object is more difficult to use. I suggest using Mongoose models which we also have in the models folder. *****
export default class ProgramDAO{
    static async injectDB(conn){
        // if we have the program collection return
        if (program)
            return
        try{
            //wait for mongodb then grab program collection
            program = await conn.db().collection(process.env.PROGRAMS_COLLECTION||"programs")
            console.log("ProgramDao injectDB success!")
        }catch(e){
            console.log("Error connecting to collection in ProgramDao")
            // console.log(e);
        }
    }
    static async filterProgram(pipeline){
        try{
            const aggCursor = program.aggregate(pipeline); 
            let result =  await aggCursor.toArray()
            return result
        }catch(e){
            throw new Error(e.message)
        }
    }
}
