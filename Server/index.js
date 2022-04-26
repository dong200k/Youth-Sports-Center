//index.js connects to mongodb and starts server on port
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import announcementDao from "./dao/announcementDAO.js"
import mongoose from "mongoose"
import ProgramDAO from "./dao/programDAO.js"
import http from "http"
import initIO from "../socket/index.js"
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
  announcementDao.injectDB(client)
  ProgramDAO.injectDB(client)
  //connect to mongoose
  mongoose.connect(process.env.MONGO_URI)

  //http server
  const server = http.Server(app)

  //pass our http server and initialize socket server
  initIO(server)

  //if mongodb connection was successful start server and listen on port
  server.listen(port, ()=>{
    console.log(`listening on ${port}`)
  })
})





