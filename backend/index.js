const express = require("express");
const cors = require('cors')
const PORT = 3000
const mainRouter = require('./Routes/index.routes')
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1", mainRouter)
app.listen(PORT, ()=>{
    console.log("Server has been Started")
})