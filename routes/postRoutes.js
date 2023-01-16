
const express = require("express")
const {createPost} = require("../controller/postController")
const router = express.Router()
const authorization = require("../util/auth") 
router.post("/create_post",authorization,createPost)
module.exports =router