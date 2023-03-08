const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");
const UserModel = db.user;

checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    //no token provided
    if(!token){
        return res.status(403)
                .send({message: "There is no token provided"});
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if(error){
            return res.status(401)
                    .send({message:"You are not authorized"});
        }
        req.userId = decoded.id;
        req.userName = decoded.username;
        next();
    });
};

//being admin grants publishing rights and able to view none-published technologies
isAdmin = (req, res, next) => {
    UserModel.findOne({_id: req.userId, isAdmin : true })
        .then(data => {
            //user is not authorized
            if(!data){
                return res.status(403)
                    .send({message:"You are not an admin"});
            }
            next();
            return;

        })
        .catch(error => {
            console.log(error)
            res.status(500).send({
                message: error.message
            })
        });
}

const authJWTToken = {
    checkToken,
    isAdmin
};

module.exports = authJWTToken;