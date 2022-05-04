//server.js initializes and the app and routes
import express from "express"
import cors from "cors"
import router from "./api/sportcenter.route.js"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

//middle ware
app.use(cors())
app.use(express.json())

//api
app.use("/api/v1/youthsportcenter", router)

//handle unknown routes
// app.use("*", (req,res)=> res.status(404).json({error: "page not found"}))

// Step 1:
app.use(express.static(path.resolve(__dirname, "../my-app/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../my-app/build", "index.html"));
});

export default app