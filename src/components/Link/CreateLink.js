import React from "react";
import userFormValidation from '../Auth/useFormValidation'
import validateCreateLink from '../Auth/validateCreateLink'
const INITIAL_STATE = {
  description : "",
  url : ""
}
function CreateLink(props) {

  const {handleSubmit ,errors, handleChange,values} = userFormValidation(INITIAL_STATE,validateCreateLink,handleCreateLink)

  function handleCreateLink(){
    console.log('link create')
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      
        <input
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="ingrese la descripcion de link"
        autoComplete="off"
        type="text"
        className={errors.description && 'error-input'}
      
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        onChange={handleChange}
        value={values.url}

        name="url"
        placeholder="ingrese la url"
        autoComplete="off"
        type="text"
       className={errors.url && 'error-input'} 
      />
      
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        submit
      </button>
      
    </form>
  )
}

export default CreateLink;
