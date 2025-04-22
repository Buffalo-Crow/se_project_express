const validator = require('validator');
const User = require('../models/user');
const {BAD_REQUEST,NOT_FOUND, OK, internalErrorHelper} = require("../utils/errors");


const getUsers = (req,res) => {
  User.find({})
  .then((users)=> res.send(users))
  .catch((err) => {
    internalErrorHelper(err,res)
  });
}

const getUser = (req,res)=>{
  const {userId}= req.params;
  User.findById(userId)
  .orFail()
  .then(user => res.status(OK).send (user))
  .catch((err) => {
    console.error(err);
    if (err.name === "CastError"){
      return res.status(BAD_REQUEST).send({message:err.message})
    }
   if (err. name === "DocumentNotFoundError"){
     return res.status(NOT_FOUND).send({message:err.message})
   }
   return internalErrorHelper(err,res)
  });
}


const createUser = (req,res) => {
  const {name, avatar} = req.body;
  if (!validator.isURL(avatar)){
  return  res.status(BAD_REQUEST).send({message:"Avatar must be a valid URL"})
  }
 User.create({name, avatar})
  .orFail()
  .then((user) => {
    res.status(OK).send(user)
  })
  .catch((err) => {
    internalErrorHelper(err,res)
  });
}


module.exports = {getUsers, getUser, createUser};