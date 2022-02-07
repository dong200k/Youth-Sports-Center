//index.js connects to mongodb and starts server on port
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

dotenv.config()
const MongoClient = mongodb.MongoClient

//use port in .env or 5000
const port = process.env.PORT || 5000

//Connect to mongodb
MongoClient.connect(
  process.env.MONGO_URI,
  {
    //50 people connect at once
    maxPoolSize : 50,
    //2500 milliseconds for request
    wtimeoutMS : 2500,
    //Use new connection parser
    useNewUrlParser: true
  }
)
.catch(err=>{
  //catch connection error
  console.log("error!!!")
  console.log(err.stack)
  process.exit(1)
})
.then(async client =>{
  //if connection was successful start server and listen on port
  app.listen(port, ()=>{
    console.log(`listening on ${port}`)
  })
})





