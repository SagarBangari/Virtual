import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import axios from 'axios';
// import { registerUser } from '../../../Server/controllers/userControllers.js'

const Register = () => {
        const [userData , setUserData] = useState({fullname:"",email:"",password:"",confirmPassword:""})
        const [error,setError] = useState("")
        const [showPassword,setShowPassword] = useState(false)
        const navigate = useNavigate()
        
        const changeInputHandler = (e)=>{
            setUserData(prevState=>({...prevState,[e.target.name]:e.target.value}))
        }

        const registerUser = async (e)=>{
          e.preventDefault();
          try{
            await axios.post(`${import.meta.env.VITE_API_URL}/users/register`,userData)
            if(response.status==200)
              navigate('/login');
          }catch(e){
            setError(e?.response?.data?.message)
          }
        }
  return (
    <section className="register">
      <div className="container register__container">
        <h2>Sign Up</h2>
        <form onSubmit={registerUser}>
         {error && <p className="form__error-message">{error}</p>}
          <input type="text"  name='fullname' placeholder='Full Name' onChange = {changeInputHandler} autoFocus/>
          <input type="text"  name='email' placeholder='Email' onChange = {changeInputHandler} />
          <div className="password__controler">
            <input type={showPassword?"text":"password"} name='password' placeholder='Password' onChange={changeInputHandler} />
            <span onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash/>:<FaEye/>}</span>
           </div> 
            <div className="password__controler">
           <input type={showPassword?"text":"password"} name='confirmPassword' placeholder='confirmPassword' onChange={changeInputHandler} />
            <span onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash/>:<FaEye/>}</span>
           </div>
            <p>Already have an account?  &nbsp; <Link to="/login" >Sign In</Link></p>
            <button type="submit" className='btn primary' >Register</button>
       
        </form>
      </div>
    </section>
  )
}

export default Register