const PostModel = require("../models/Post");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const { htmlToText } = require("html-to-text");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const jwt = require("jsonwebtoken")

module.exports.createPost = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    const { title, body, description, slug, id, name } = fields;
    const errors = [];
    if (title === "") {
      errors.push({ msg: "Title is required" });
    }
    if (body === "") {
      errors.push({ msg: "body is required" });
    }
    if (description === "") {
      errors.push({ msg: "Description is required" });
    }
    if (slug === "") {
      errors.push({ msg: "slug is required" });
    }
    if (Object.keys(files).length === 0) {
      errors.push({ msg: "Image is required" });
    } else {
      console.log(files);
      const { mimetype } = files.image;
      const split = mimetype.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        errors.push({ msg: `${extension} is not valid extensions` });
      } else {
        files.image.originalFilename = uuidv4() + "." + extension;
      }
    }
    const checkSlug = await PostModel.findOne({ slug });
    if (checkSlug) {
      errors.push({ msg: "please choose a unique slug/url" });
    }
    if (errors.length !== 0) {
      return res.status(400).send({ errors, files });
    } else {
      const newPath =
        __dirname + `/../client/public/images/${files.image.originalFilename}`;
      fs.copyFile(files.image.filepath, newPath, async (error) => {
        if (!error) {
          try {
            const createPots = await PostModel.create({
              title,
              body,
              image: files.image.originalFilename,
              description,
              slug,
              userName: name,
              userId: id,
            });
            return res
              .status(201)
              .send({ msg: "Your post have been created successfully" });
          } catch (error) {
            return res.status(500).send(error);
          }
        }
      });
    }
  });
};

module.exports.fetchPosts = async (req, res) => {
  const id = req.params.id;
  const page = req.params.page;
  const perPage = 10;
  const skip = (page - 1) * perPage;
  try {
    const count = await PostModel.find({ userId: id }).countDocuments();
    const response = await PostModel.find({ userId: id })
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).send({ response, count, perPage });
  } catch (error) {
    return res.status(500).send({ errors: error, msg: error.message });
  }
};

module.exports.getByIdPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById({ _id: id });
    return res.status(200).send({ post });
  } catch (error) {
    return res.status(500).send({ errors: error, msg: error.message });
  }
};

module.exports.updateValidations = [
  body("title").notEmpty().trim().withMessage("Title is required"),
  body("body")
    .notEmpty()
    .trim()
    .custom((value) => {
      let bodyValue = value.replace(/\n/g, "");
      if (htmlToText(bodyValue).trim().length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Body is required"),
  body("description").notEmpty().trim().withMessage("Description is required"),
];
module.exports.updatePost = async (req, res) => {
  const { title, body, description, id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  } else {
    try {
      const response = await PostModel.findByIdAndUpdate(id, {
        body,
        title,
        description,
      });
      return res.status(200).send({ msg: "Your post has been updated" });
    } catch (error) {
      return res.status(500).send({ errors: error, msg: error.message });
    }
  }
};

module.exports.updateImage = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (errors, fields, files) => {
    const { id } = fields;
    const ImageError = [];
    if (Object.keys(files).length === 0) {
      ImageError.push({ msg: "Please choose image" });
    } else {
      const { mimetype } = files.image;
      const split = mimetype.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
        ImageError.push({ msg: `${extension} is not a valid extension` });
      } else {
        files.image.originalFilename = uuidv4() + "." + extension;
      }
    }
    if (ImageError.length !== 0) {
      return res.status(400).send({ errors: ImageError });
    } else {
      const newPath =
        __dirname + `/../client/public/images/${files.image.originalFilename}`;
      fs.copyFile(files.image.filepath, newPath, async (error) => {
        if (!error) {
          try {
            const response = await PostModel.findByIdAndUpdate(id, {
              image: files.image.originalFilename,
            });
            return res
              .status(200)
              .send({ msg: "your image hash been updated" });
          } catch (error) {
            return res.status(500).send({ errors: error, msg: error.message });
          }
        }
      });
    }
  });
};

module.exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await PostModel.findByIdAndRemove(id);
    return res
      .status(200)
      .send({ msg: "Your post hash been deleted", response });
  } catch (error) {
    return res.status(500).send({ errors: error, msg: error.message });
  }
};

const UserModel = require("../models/User");
module.exports.profileUpdate = async(req,res) =>{
    const {name, id} = req.body;
    console.log(name)
   if(name ===''){
    return res.status(400).send({errors: [{msg:"Name is required"}]})
   } else {
    try{
      const user = await UserModel.findOneAndUpdate(id, {name:name},{new:true });
      const token =jwt.sign({user}, process.env.SECRET,{
        expiresIn:'1d'
      })
      return res.status(200).send({msg:"Your Name is updated...",token})
    }catch(error){
    return res.status(500).send({ errors: error, msg: error.message });
    }
   }
}

module.exports.updatePassword = (req, res) =>{

}