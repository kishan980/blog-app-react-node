const PostModel = require("../models/Post")
const formidable = require("formidable");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
module.exports.createPost =(req, res) =>{
        const form = formidable({multiples:true})
        form.parse(req, async(error, fields, files) =>{
            const {title, body, description, slug, id, name} = fields
            const errors = [];
            if(title === ""){
                errors.push({msg:"Title is required"});
            } 
             if(body === ""){
                errors.push({msg:"body is required"})
            } 
             if(description === ""){
                errors.push({msg:"Description is required"})
            } 
             if(slug ===""){
                errors.push({msg:"slug is required"})
            } 
            if(Object.keys(files).length===0){
                errors.push({msg:"Image is required"})
            } else {
                console.log(files)
                const {mimetype} = files.image;
                const split = mimetype.split("/")
                const extension = split[1].toLowerCase()
                if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                    errors.push({msg:`${extension} is not valid extensions`})
                } else {
                       files.image.originalFilename = uuidv4() + '.' +extension;
                  
                }

            }
            const checkSlug = await PostModel.findOne({slug})
            if(checkSlug){
                errors.push({msg:"please choose a unique slug/url"})
            }
            if(errors.length !==0){
                return res.status(400).send({errors,files})
            } else {
                const newPath = __dirname + `/../client/public/images/${files.image.originalFilename}`;
                fs.copyFile(files.image.filepath , newPath, async (error) =>{
                    if(!error){
                            try{
                                    const createPots = await PostModel.create({
                                        title,
                                        body,
                                        image:files.image.originalFilename,
                                        description,
                                        slug,
                                        userName:name,
                                        userId:id
                                    })
                                    return res.status(201).send({msg:"Your post have been created successfully"})
                                }catch(error){
                                return res.status(500).send(error)
                            }
                    }
                })
            }
        })
}