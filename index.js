const express = require("express");
const connect = require("./config/db")
require("dotenv").config()
const app = express();
const cors = require("cors")
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes")
app.get("/", (req,res) =>{
    res.send(`hello morn blog`)
})

// connect 
connect()
app.use(cors())
app.use(express.json())
app.use("/", userRouter)
app.use("/", postRouter)
const PORT = process.env.PORT || 80000

app.listen(PORT, ()=>{
    console.log(`server is running ${process.env.PORT}`)
});