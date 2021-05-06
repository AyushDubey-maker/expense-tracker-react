import React, { useEffect, useState } from 'react'
import './Header.css'

import { Button } from '@material-ui/core'
import { auth } from '../firebase'
// import {useHistory} from 'react-router-dom'
function Header() {
    const [user,setUser]=useState(null)
    // const history=useHistory()
    function logout(){
        auth.signOut()
        // history.push('/login')
    
        
    }
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                setUser(authUser)
            }else{
                setUser(null)
            }
        })
    })
    return (
        <div>
            {user?(
                <div className="header_user">
                <h2>Expense Tracker</h2>
              
                <Button className="logout_button" variant="outlined" color="secondary" onClick={logout}>Logout</Button>
                </div>
            ):(
                <h2>Expense Tracker</h2>
            )}
        </div>
    )
}

export default Header
