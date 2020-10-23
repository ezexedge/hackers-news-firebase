import React from "react";
import {Link} from 'react-router-dom'
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../../firebase'
const INITIAL_STATE = {
  name :"",
  email:"",
  password: ""
}

function Login(props) {
const  {handleSubmit,handleBlur,handleChange,values,errors,isSubmitting} =   useFormValidation(INITIAL_STATE,validateLogin,authenticateUser)        
  const [login, setLogin] = React.useState(true)
 const [firebaseError, setFirebaseError] =React.useState(null) 
  async function authenticateUser(){
    const {name , email ,password} = values
   
    try{
     login ? await firebase.login(email,password) :
    await firebase.register(name,email,password)
      props.history.push('/')
    //console.log({response})
    
    }
    catch(err){
      console.error('authenticate error',err)
      setFirebaseError(err.message)
    }
    
     }

  return(
  
    <div>
    
    
      <h2 className="mv3">{login ? "iniciar sesion" : "crear cuenta"}</h2>
      <form  onSubmit={handleSubmit} className="flex flex-column">
        {!login &&
       ( <input
        value={values.name}
         name="name"
         onChange={handleChange}  
          type="text"
          placeholder="ingrese tu nombre"
          autocomplete="off"

        
        />
       )}
         <input
        onBlur={handleBlur}
        name="email"
          className={errors.email && 'error-'}
           value={values.email}
           onChange={handleChange}  
          type="email"
          placeholder="ingresa tu email"
          autocomplete="off"

        
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
          <input
       onBlur={handleBlur}
        name="password"
        value={values.password}
            onChange={handleChange} 
          type="password"
          placeholder="ingrese tu contraseña"
          autocomplete="off"

        
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
          <div className="flex mt3">
            
          <button type="submit" className="button pointer mr2" disabled={isSubmitting}
          style={{background: isSubmitting ? "grey" : "orange"}}
          >

            submit
          
          </button>
          <button type="submit" className="button pointer" onClick={()=> setLogin(prevLogin => !prevLogin)}>
            {login ? "necesita crear una cuenta" : "ya tienes una cuenta?"}
            </button>
          
        </div>
   
      </form>
      <div className="forgot-password">
        <Link to="/forgot">forgot password?</Link>
      </div>
    </div>

  )
}

export default Login;
