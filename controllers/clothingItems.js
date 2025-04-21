const validator = require ("validator");
const ClothingItem = require('../models/clothingItem');
const {BAD_REQUEST,NOT_FOUND,INTERNAL_SERVER_ERROR, OK} = require("../utils/errors");

const getItems = (req,res) =>{
  ClothingItem.find({})
  .then((items)=> res.send(items))
  .catch((err)=>{
    console.error(err);
    return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})
    });
}

const postItem = (req,res) => {
  const {name, weather, imageURL} = req.body;
  if(!validator.isURL(imageURL)){
  res.status(BAD_REQUEST).send({message:"Must be a valid URL"})
  return;
  }
  ClothingItem.create({name,weather,imageURL})
  .then((item)=>{
    res.status(OK).send(item)
  })
  .catch((err)=> {
    console.error(err);
    return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})
  });
}

const deleteItem = (req,res) =>{
  const {itemId} = req.params;
ClothingItem.findByIdAndRemove(itemId)
.then(items => res.send (items))
.catch((err)=> {
  console.error(err);
  return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})
});
}

const likeItem = (req, res) =>{
  const {itemId} = req.params;
ClothingItem.findByIdAndUpdate(itemId,
{ $addToSet: {likes:req.user._id} },
{new: true}
)
.then((item)=>{
  if(!item){
    return res.status (NOT_FOUND).send({message:"Item Id not Found"})
  } return res.status(200).send(item);
})
.catch((err)=>{
  console.error(err);
  return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})
});
};


const dislikeItem = (req,res) =>{
  const {itemId} = req.params;
  ClothingItem.findByIdAndUpdate(itemId,
  {$pull :{likes:req.user._id}},
  {new: true})
  .then((item)=>{
    if(!item){
      return res.staus(NOT_FOUND).send({message:"Item Id not Found "})
    } return res.status(OK).send(item);
  })
  .catch((err)=>{
  console.error(err);
  return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})
  });
};


module.exports ={getItems, postItem, deleteItem, likeItem, dislikeItem };