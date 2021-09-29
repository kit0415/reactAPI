const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.title){
      res.status(400).send({
          message:"Empty Title"
      });
      return;
  }

  const tutorial = {
    title : req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published :false
  };

  Tutorial.create(tutorial).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error Occur"
      });
  })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    console.log(title);
    var condition = title ? {title:{[Op.like]: `%${title}%`}} :null
    Tutorial.findAll({where:condition}).then(data=>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Error Occur"
        });
    });
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id  = req.params.id;

  Tutorial.findByPk(id).then(data=>{
      res.send(data);
  }).catch(err=>{
      res.status(500).send({
          message: "Error retrieving id: "+id
      });
  });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body,{
      where: {id:id}
  }).then(num=>{
      if (num == 1){
          res.send({
              message: "Updated"
          });
      }
      else{
          res.send({
              message: "Not Updated"
          })
      }
  }).catch(err=>{
    res.status(500).send({
        message: "Error Update Id:"+id
    });
  });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
      where: {id:id}
  }).then(num=> {
      if (num == 1){
          res.send({
              message:"Deleted"
          });
      }
      else{
          res.send({
              message: "Not deleted"
          });
      }
  }).catch(err=>{
      res.status(500).send({
          message:"Cannot delete id: "+id
      });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
      where: {},
      truncate: false
  }).then(nums=>{
      res.send({
          message: `${nums} Tutorials were deleted successfully!`
      });
  }).catch(err=>{
      res.status(500).send({
          message: err.message || "error occur"
      });
  });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({
      where: {
          published:true
      }
  }).then(data=>{
      res.send(data);
  }).catch(err=>{
      res.status(500).send({
          message: err.message || "Cannot retrieve"
      });
  });
};