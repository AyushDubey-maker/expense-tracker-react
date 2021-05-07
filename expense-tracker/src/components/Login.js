import React,{useState} from 'react'
import './Login.css'

import { auth } from '../firebase'


function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    // const history=useHistory()
    function login(event){
        event.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .then((auth)=>{
        //    history.push('/')
        })
        .catch(e=>alert(e.message))
       
        
     }
     const register=(event)=>{
         event.preventDefault()
         auth.createUserWithEmailAndPassword(email,password)
         .then((auth)=>{
            //  history.push('/')
         })
         .catch(e=>alert(e.message))
     }
    return (
        <div className="login">
      
        <div className="login_container">
            <h1>Sign in</h1>
            <form>
                <h5>Email</h5>
                <input required value={email} type="email" onChange={event=>setEmail(event.target.value)}/>
                <h5>Password</h5>
                <input required value={password} type="password" onChange={event=>setPassword(event.target.value)}/>
                <button type="submit" onClick={login} className="login_button">Log-In</button>
               
            </form>
           
           <button type="submit"  onClick={register} className="register_button">Create Your Account</button>
        </div>
       </div>
    )
}

export default Login
