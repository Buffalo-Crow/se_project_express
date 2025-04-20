const validator = require('validator');
const User = require('../models/user');


const getUsers = (req,res)=>{
  User.find({})
  .then((users)=> res.send({data:users}))
  .catch((err)=> {
    console.error (err);
    return res.status(500).send({message:err.message});
  });
}


const getUser = (req,res)=>{
  User.findById(req.params.id)
  .then(user =>res.send ({data:user}))
  .catch((err)=> {
    console.error(err);
    return res.status(500).send({message:err.message});
  })
}


// ask for help from a tutor on this one
const createUser = (req,res) => {
  const {name, avatar} = req.body;
  if (!validator.isURL(avatar)){
    res.status(400).send({message:"Avatar must be a valid URL"})
  }
  User.create({name, avatar})
  .then((user) => {
    res.send({data:user})
  })
  .catch((err) => {
     res.status(500).send({message: err.message})
  });
}


module.exports = {getUsers, getUser, createUser};