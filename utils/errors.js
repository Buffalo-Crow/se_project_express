const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const OK =201;


const handleError = (err,res) =>{
  console.error(err);
  if (err.statusCode){
    return res.status(err.statusCode).send({message:err.message})
  } return res.status(INTERNAL_SERVER_ERROR).send({message: "An error ocurred on the server"});
};





module.exports = {BAD_REQUEST,NOT_FOUND,INTERNAL_SERVER_ERROR, OK, handleError};