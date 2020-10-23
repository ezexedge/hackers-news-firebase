import React from "react";
import FirebaseContext from '../../firebase/context'
function ForgotPassword() {
  const {firebase} = React.useContext(FirebaseContext)
  const [resetPasswordEmail,setResetPasswordEmail] = React.useState("")
 const [isResetPassword, setIsResetPassword] = React.useState(false) 
 const [passwordResetError, setPasswordResetError] = React.useState(null)
  async function handleResetPassword(){
    try{
      await firebase.resetPassword(resetPasswordEmail)
      setIsResetPassword(true)
      setPasswordResetError(null)
    }catch(err){
      console.log("error al enviarel email",err)
      setPasswordResetError(err.message)
      setIsResetPassword(false)
    }
  }
  
    

  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="ingresa tu email con el que te registraste"
        onChange={event => setResetPasswordEmail(event.target.value)}
      />

      <div>
        <button className="button" onClick={handleResetPassword}>
          Reestablecer la contraseña
        </button>
      </div>
      {isResetPassword && <p>Revice su bandeja de entrada</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  )
}

export default ForgotPassword;
