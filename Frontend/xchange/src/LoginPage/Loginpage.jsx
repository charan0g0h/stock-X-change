import { useState } from "react"
import styles from "./Loginpage.module.css"
import { useNavigate } from "react-router-dom";
function LoginPage(){
    const [username,SetUsername] = useState();
    const [password,SetPassword] = useState(); 
    const nav = useNavigate()
    function submitform(e){
        e.preventDefault()
        sendLoginRequest()
    }
    function handleCreateOne(){
        nav("/register")
    }
    async function sendLoginRequest(){
        const response = await fetch("http://localhost:8080/login",{
            method : "POST",
            headers : {
                'Content-Type' :  'application/json'
            },
            body : JSON.stringify({
                "username" : username,
                "password" : password
            })
        })
        console.log(response)
        const data = await response.text()
        if(response.status == 200){
            nav("/home/dashboard")
        }
        localStorage.setItem("jwt",data);
    }
    return (
        <div className={styles.base}>
            <div className={styles.loginbox}>
                <form className={styles.form} onSubmit={submitform}>
                    <h1>STOCK X CHANGE</h1><br></br>
                    <label>UserName</label><br></br>
                    <input type="text" value={username} onChange={(e) => SetUsername(e.target.value)}></input><br></br>
                    <label>Password</label><br></br>
                    <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)}></input><br></br>
                    <button type="submit">Login</button>
                    <p>By clicking login you agree with T&C</p>
                    <p onClick={handleCreateOne} className="text-blue-500 hover:cursor-pointer">Don't have account Create one</p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage