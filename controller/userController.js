const { body, validationResult } = require("express-validator");
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = (user) =>{
    return jwt.sign({user}, process.env.SECRET,{expiresIn:"1d"})
}

module.exports.registerValidation = [
  body("name").not().isEmpty().trim().withMessage("Name is required!"),
  body("email")
    .not()
    .isEmpty()
    .trim()
    .isEmail()
    .withMessage("Please enter the valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters long"),
];
module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  try {
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: `email is already taken ${checkUser.email}` }] });
    }
    ///hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await userModel.create({
        name,
        email,
        password: hash,
      });
      const token = createToken(user)
      return res.status(201).send({msg:"Your account has been created", token});
    } catch (error) {
      return res
        .status(500)
        .send({ error: `internal server error.....${error}` });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: `internal server error.....${error}` });
  }
};

module.exports.loginValidation = [
    body("email").not().isEmpty().isEmail().trim().withMessage("Email is required."),
    body("password").not().isEmpty().trim().withMessage("Password is required.")
]
module.exports.login = async(req, res) =>{
    const {email,password} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    try{
        const user = await userModel.findOne({email});
        if(user){
            const matched = await bcrypt.compare(password,user.password)
            if(matched){
                const token = createToken(user)
                return res.status(200).send({msg:"you have login successfully", token})
            } else {
                return res.status(401).send({errors:[{msg:`password not correct`}]})
            }
        } else {
            return res.status(404).send({errors:[{msg:`email is not found ${email}`}]})
        }
        
    }catch(error){
        return res.status(500).send({errors:error})
    }
}