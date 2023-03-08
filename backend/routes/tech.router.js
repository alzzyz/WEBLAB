module.exports = app => {
    const technology = require("../controllers/tech.controller.js");
    const auth = require("../middlewares/auth.token");
    var router = require("express").Router();
    
    
    //get all
    router.get("/",[auth.checkToken, auth.isAdmin] ,technology.findAll);

    //get published
    router.get("/published", [auth.checkToken],technology.findAllPublished);
    //get unpublished
    router.get("/unpublished", [auth.checkToken],technology.findAllUnPublished);

    //get by id
    router.get("/:id",[auth.checkToken], technology.find);
 
    //add tech
    router.post("/",[auth.checkToken, auth.isAdmin] ,technology.create);

    //update
    router.put("/:id", [auth.checkToken, auth.isAdmin],technology.update);

    //delete
    router.delete("/:id", [auth.checkToken, auth.isAdmin], technology.delete);

 
    app.use("/api/tech", router);
}