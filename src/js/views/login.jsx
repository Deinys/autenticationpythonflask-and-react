import React, {useState, useContext} from "react"
import { Context } from "../store/appContext"
import { Link } from "react-router-dom"


export const Login = ()=>{
    const {actions} = useContext(Context)
    const [login, setLogin] = useState({
        email: "",
        password: "",
        username: ""
    })
    
    return (
        <div className="container">
        <div className="form d-flex flex-column align-items-center my-5">

                <p>Email:</p>
                <input type="text" name='email' placeholder="email"
                onChange={(event)=> setLogin({...login, [event.target.name]: event.target.value})}></input>
                <p className="mt-3">Password:</p>
                <input type="text" name='password'placeholder="password" 
                onChange={(event)=> setLogin({...login, [event.target.name]: event.target.value})}></input>
                <p className="mt-3">Username:</p>
                <input type="text"  className="align-self-center" name='username' placeholder="username"
                onChange={(event)=> setLogin({...login, [event.target.name]:event.target.value})}></input>
            

            <button type="button" className="btn btn-secondary my-3 align-self-center" 
            onClick={()=> actions.handleLogin(login)}>Log in</button>
        </div>
        </div>
    )
}
