const User = require('../models/user');
const {BAD_REQUEST,NOT_FOUND,CREATED, internalErrorHelper, INTERNAL_SERVER_ERROR} = require("../utils/errors");


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
  .then(user => res.status(200).send (user))
  .catch((err) => {
    console.error(err);
    if (err.name === "CastError"){
      return res.status(BAD_REQUEST).send({message:"Invalid Id format"})
    }
   if (err. name === "DocumentNotFoundError"){
     return res.status(NOT_FOUND).send({message:"This document was not found"})
   }
   return internalErrorHelper(err,res)
  });
}


const createUser = (req,res) => {
  const {name, avatar} = req.body;
 User.create({name, avatar})
  .then((user) => {
    res.status(CREATED).send(user)
  })
  .catch((err) => {
    if(err.name ==="ValidationError") {
      return res.status(BAD_REQUEST).json({message:"Invalid Request"});
    }
   return res.status(INTERNAL_SERVER_ERROR).json({message:"An error has ocurred on the server"});
  });
}


module.exports = {getUsers, getUser, createUser};