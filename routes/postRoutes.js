const express = require("express");
const {
  createPost,
  fetchPosts,
  getByIdPost,
  updatePost,
  updateValidations,
  updateImage,
  deletePost,
  profileUpdate
} = require("../controller/postController");
const router = express.Router();
const authorization = require("../util/auth");
router.post("/create_post", authorization, createPost);
router.get("/posts/:id/:page", authorization, fetchPosts);
router.get("/post/:id", authorization, getByIdPost);
router.post("/update", [updateValidations, authorization], updatePost);
router.post("/updateImage", authorization,updateImage)
router.delete("/deletePost/:id", authorization,deletePost)
router.post("/updateName", authorization, profileUpdate)
router.post("/updatePassword", authorization, updatePassword)
module.exports = router;
