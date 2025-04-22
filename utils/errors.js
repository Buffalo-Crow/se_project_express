const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const OK =201;


function internalErrorHelper(err, res) {
  console.error(err);
  return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})
}

function responseHandler(res,item){
  if(!item){
    return res.status(NOT_FOUND).send({message:"Item Id not Found "})
  } return res.status(OK).send(item);
}

function castErrorHandler (err,res) {
  console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({message:"Invalid ID format"})}

 return res.status(INTERNAL_SERVER_ERROR).send({message:err.message})

}

module.exports = {BAD_REQUEST,NOT_FOUND,INTERNAL_SERVER_ERROR, OK, internalErrorHelper, responseHandler, castErrorHandler};