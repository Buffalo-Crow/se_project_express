const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const CREATED =201;
const SUCCESS= 200;


function internalErrorHelper(err, res) {
  console.error(err);
  return res.status(INTERNAL_SERVER_ERROR).send({message:"An error has ocurred on the server"})
}

function responseHandler(res,item){
  if(!item){
    return res.status(NOT_FOUND).send({message:"Item Id not Found "})
  } return res.status(SUCCESS).send(item);
}

function castErrorHandler (err,res) {
  console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({message:"Invalid ID format"})}

 return res.status(INTERNAL_SERVER_ERROR).send({message:"An error has ocurred on the server"})

}

module.exports = {BAD_REQUEST,NOT_FOUND,INTERNAL_SERVER_ERROR, CREATED, internalErrorHelper, responseHandler, castErrorHandler};