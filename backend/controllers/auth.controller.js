require("dotenv").config();
const db = require("../models");
const auth = require("../middlewares/auth.token");
const UserModel = db.user;

let jwt = require("jsonwebtoken");
const { checkToken } = require("../middlewares/auth.token");

exports.login = (req, res) => {

   UserModel.findOne({
        email: req.body.email
   }).then(user => {
        
        //no user found
        if(!user){
            return res.status(401).send({
                accessToken: null,
                message: "Password or Email invalid" //we dont wanna let the user know that his email could be right!
            });
        }

        let checkPasswordMatch = (user.password == req.body.password); 
      
        //pw not matching
        if(!checkPasswordMatch){
            return res.status(401).send({
                accessToken: null,
                message: "Password or Email invalid" //we dont wanna let the user know that his email could be right!
            });
        } 
        let token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET, {
            expiresIn: 900
        });

             
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: token
        });

   }).catch(error => {
        console.log(error)
        res.status(500).send({message: "An error has occured"});
   })
}

exports.validateToken = async(req, res) => {
    let token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if(error){
            return res.status(200)
                    .send({message:"invalid"});
        }
        else { res.status(200).send({message: "valid"});}
        
    });
   
};

exports.logout = async(req, res) => {
    try{
        req.session = null;
        return res.status(200).send({message:"Logged out"})
    } catch(error){
        this.next(err)
    }
}