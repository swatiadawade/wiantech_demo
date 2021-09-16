const router = require("express").Router();

const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res)=>{
    //res.send("user registered");
    //check email id in DB
    const emailExist = await User.findOne({
        email: req.body.email
    });

    if(emailExist) return res.status(400).send('Email already exist');

    // has password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    //create User
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashpassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(error){
        req.statusCode(400).send(error);
    };
});

router.post('/login', async (req, res) => {
    //check emailid in DB
    const user = await User.findOne({
        email: req.body.email
    });
    if(!user) return res.status(400).send('Wrong Email!!!');
    
    //checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password!!');
    
    const token = jwt.sign({_id:user._id}, process.env.JWT_TOKEN_SECRET);
    res.header("auth-token", token).send({token: token});
    //return res.send('User Logged in');
});
module.exports = router;