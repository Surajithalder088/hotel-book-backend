import http from "http"
import app from "./app.js"
 import "dotenv/config.js"

const server =http.createServer(app)


let port=process.env.PORT ||7000

server.listen(port,()=>{
    console.log(" runnig on port :",port);
    
})