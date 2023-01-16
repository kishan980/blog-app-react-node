const jwt = require("jsonwebtoken")
module.exports = (req, res, next) =>{
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split(" ")[1];
    console.log("🚀 ~ file: auth.js:5 ~ token", token)
    try{
        jwt.verify(token, process.env.SECRET, (error, result) =>{
            if(error){
                return res.status(400).send({errors:[{msg:"invalid valid jwt-token"}]})
            }
        })
        next();
    }
    catch(error){
        return res.status(401).send({errors:[{msg:error.message}]})
    }
}