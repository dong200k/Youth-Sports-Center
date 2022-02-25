//server.js initializes and the app and routes
import express from "express"
import cors from "cors"
import sportcenter from "./api/sportcenter.route.js"

const app = express()

//middle ware
app.use(cors())
app.use(express.json())

//api
app.use("/api/v1/youthsportcenter", sportcenter)

//handle unknown routes
app.use("*", (req,res)=> res.status(404).json({error: "page not found"}))

export default app