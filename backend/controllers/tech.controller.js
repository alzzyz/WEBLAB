const db = require("../models/");
const techModel = db.tech;

exports.create = (req, res) => {
    //empty data ?
    if(!req.body.name){
        return res.status(400)
            .send({
                message: "no name given!"
            });
        
    }

    const timestampNow = Date.now();
         
    const techEntry = new techModel({
        name: req.body.name,
        category: req.body.category,
        ring: req.body.ring,
        description: req.body.description,
        descriptionClassification: req.body.descriptionClassification,
        published: false,
        createdAt: Date.now(),
        createdBy: req.userName
    });
        .then(data => {
            
            res.status(200).send({message: "success"});
        })
        .catch(error => {
            res.status(500).send({
                message: error.message 
            });
        });

};

exports.update = async(req,res) => {
    if(!req.params.id){
        return res.status(400)
                .send({
                    message: "no id given!"
                });
    }
    
    
    let doc = await techModel.findOneAndUpdate({ _id: req.params.id}, req.body, {new: true});
    //history
    doc.changes.push({user: req.userName, updatedAt: Date.now()});

    await doc.save()
        .then(data => {
            if(!data){
                res.status(404)
                .send({message:"No Technology found"});
            }else {
                res.send({message:"success"});
            }
        }).catch(error =>{
            res.status(500).send({
                message: error.message 
            });
        })

}

exports.find = (req, res) => {
    
    //find single entry - edit view
    if(!req.params.id){
        return res.status(400)
        .send({
            message: "no id given!"
        });
    } 

    techModel
        .findById(req.params.id)
        .then(data => {
            //nothing under that id
            if(!data){
                res.status(404)
                .send({message:"No Technology found"});
            }else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({
                message: error.message 
            });
        });
}

exports.findAll = (req, res) => {
    //find all entries - admin view
    techModel
        .find()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error.message 
            });
        });

};

exports.findAllPublished = (req, res) => {
    //find entries only published - normal view  
        techModel
            .find({published : true})
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({
                    message: error.message 
                });
            });
}

exports.findAllUnPublished = (req, res) => {
    //find entries only published - normal view  
        techModel
            .find({published : false})
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({
                    message: error.message 
                });
            });
}

exports.delete = (req, res) => {
    if(!req.params.id){
        return res.status(400)
        .send({
            message: "no id given!"
        });
    } 

    techModel.findByIdAndRemove(req.params.id)
            .then(data => {
                if(!data){
                    res.status(404)
                    .send({message:"No Technology found"});
                }else {
                    res.send({message: "success"});
                }
            }).catch(error =>{
                res.status(500).send({
                    message: error.message 
                });
            })
}


