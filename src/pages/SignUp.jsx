import { useState } from 'react'
import { signupService } from "../service/auth.services"
import { useNavigate } from "react-router-dom"
import {uploadImageService} from "../service/upload.services"

function SignUp() {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [city, setCity]= useState("")
  const [avatar, setAvatar] = useState("")
  const [isFetching, setIsFetching] = useState(false)


  const [ errorMessage, setErrorMessage ] = useState("")


const handleEmailChange = (e) => setEmail(e.target.value)
const handlePasswordChange = (e) => setPassword(e.target.value)
const handleFirstNameChange = (e) => setFirstName(e.target.value)
const handleLastNameChange = (e) => setLastName(e.target.value)
const handleAgeChange = (e) => setAge(e.target.value)
const handleCityChange = (e) => setCity(e.target.value)



const handleUpdateAvatar = async(event)=> {
  setIsFetching(true)
  const sendObj = new FormData()
  sendObj.append("avatar", event.target.files[0] )

  try {
    
    const response = await uploadImageService(sendObj)
    console.log("foto", response.data.avatar)
    setAvatar(response.data.avatar)
    setIsFetching(false)
  } catch (error) {
    console.log("error", error)
    navigate("/error")
    
  }


}

  const handleSignup = async (e) => {
    e.preventDefault()
    
    const newUser = { 
      email: email, 
      password: password, 
      firstName: firstName, 
      lastName: lastName, 
      age: age, 
      city: city, 
      avatar: avatar
    }
    console.log("usuario creado",newUser);
    try {
      
      await signupService(newUser)
      navigate("/login")
  
    } catch (error) {
      if(error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
      else {
        navigate("/error")
      }
    }
  } 

  

  return (
    <div>
      <h2>SignUp</h2>

      <form onSubmit={handleSignup}>

      <label htmlFor='firstName'>Nombre: </label>
      <input type="text" name="firstName" value={firstName} onChange={handleFirstNameChange}/>
      <br />
      <label htmlFor='lastName'>Apellidos: </label>
      <input type="text" name="lastName" value={lastName} onChange={handleLastNameChange}/>
      <br />
      <label htmlFor='email'>Email: </label>
      <input type="email" name="email" value={email} onChange={handleEmailChange}/>
      <br />
      <label htmlFor="password">Contraseña: </label>
      <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
      <br />
      <label htmlFor='avatar'> Avatar: </label>
      <input type="file" name="avatar" onChange={handleUpdateAvatar}/>
      <br />
      <label htmlFor='age'>Edad: </label>
      <input type="number" name="age" value={age} onChange={handleAgeChange}/>
      <br />
      <label htmlFor='city'>Ciudad: </label>
      <input type="text" name="city" value={city} onChange={handleCityChange}/>
      <br />
      <button type="submit">Registrar</button>
      {errorMessage !== "" && <p>{errorMessage}</p> }
      </form>


    </div>
  )
}

export default SignUp