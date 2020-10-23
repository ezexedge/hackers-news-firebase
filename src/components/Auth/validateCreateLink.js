export default function validateCreateLink(values) {
let errors = {}

  if(!values.description){
    errors.description = "La descripcio es necesaria"
  }else if(values.description.length < 10){
    errors.description = "debe tener un minimo de 10 caracteres "
  }


  if(!values.url){
    errors.url = "URL required"
  }else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ){
    errors.url = "la URL debe se valida"
  } 

return errors
}
