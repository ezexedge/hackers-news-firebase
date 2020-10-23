export default function validateLogin(values) {
let errors = {}

  if(!values.email){
    errors.email = "el email es necesario"
  }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
    errors.email = "email invalido"
  }


  if(!values.password){
    errors.password = "password es necesario"
  }else if(values.password.length < 6){
    errors.password = "el password debe tener minimo 6 caracteres"
  } 

return errors

}
