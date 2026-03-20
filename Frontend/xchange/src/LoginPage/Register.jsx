import styles from "./Loginpage.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
function Register(){
    const [username,SetUsername] = useState();
    const [password,SetPassword] = useState(); 
    const nav = useNavigate()
    function submitform(e){
        e.preventDefault()
        sendLoginRequest()
    }
    function handleGoBack(){
        nav("/")
    }
    async function sendLoginRequest(){
        const response = await fetch("http://localhost:8080/register",{
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
            nav("/")
        }
        localStorage.setItem("jwt",data);
    }
    return(
        <>
         <div className={styles.base}>
                    <div className={styles.loginbox}>
                        <form className={styles.form} onSubmit={submitform}>
                            <h1>STOCK X CHANGE</h1><br></br>
                            <label>UserName</label><br></br>
                            <input type="text" value={username} onChange={(e) => SetUsername(e.target.value)}></input><br></br>
                            <label>Password</label><br></br>
                            <input type="password" value={password} onChange={(e) => SetPassword(e.target.value)}></input><br></br>
                            <input type="password" value={password} placeholder="enter password again" onChange={(e) => SetPassword(e.target.value)}></input><br></br>
                            <button type="submit">Sign Up</button>
                            <p>By clicking login you agree with T&C</p>
                            <p onClick={handleGoBack} className="text-orange-500 pb-3 hover:cursor-pointer">go back to login</p>
                        </form>
                    </div>
                </div>
        </>
    )
}
export default Register