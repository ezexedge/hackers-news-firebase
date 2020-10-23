import React, {useState} from "react";

function useFormValidation(initialState,validate,authenticate ){
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)
  function handleChange(event){
  event.persist()
    setValues(previusValues => ({
      ...previusValues ,
      [event.target.name] : event.target.value
    }))
  }

  React.useEffect(()=>{
    if(isSubmitting){
      const noErrors = Object.keys(errors).length === 0
      if(noErrors){
       // console.log('authenticated',values)
        authenticate()
        setSubmitting(false)
      }else{
          setSubmitting(false)
      }
    } 
  },[errors])

  function handleBlur(){

    const validationErrors = validate(values)
    setErrors(validationErrors)

  }

  function handleSubmit(event){
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitting(true)
      
    //console.log({values})
  }
  return {handleSubmit,handleBlur,handleChange,values,errors,isSubmitting}
}

export default useFormValidation;
