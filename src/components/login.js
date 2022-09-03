import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Profilecomponent from "./profile";
import Profileformcomponent from "./profileform";

function Logincomponent(){
    const data2 = JSON.parse(localStorage.getItem("logindetails"));
    const navigate = useNavigate();
    const [inputvals,setInputvals] = useState({email: '', password: ''});
    const [details,setDetails] = useState([]);
    useEffect(()=>{
        fetch("https://guvi-backend.vercel.app/getDetails").then(res=>{
            return res.json()
        }).then(data=>setDetails(data));
    },[])

    var iep = document.getElementById('iep');
    var login = document.getElementById('login');
    var handleLogin = (e) => {
        e.preventDefault();
        for(var i=0; i<details.length; i++){
            var detail = details[i];
            if(detail.email === inputvals.email && detail.password === inputvals.password){
                localStorage.setItem("logindetails", JSON.stringify(detail));
                if(detail.age){
                    navigate('/profile');
                }else{
                    navigate('/profileform')
                }
            }
        }
        if(detail.email !== inputvals.email){
            iep.style.display = "block";
            login.style.transform = "translateY(20%)";
        }
        if(detail.password !== inputvals.password){
            iep.style.display = "block";
            login.style.transform = "translateY(20%)";
        }
        console.log(detail);
    }

    return(
        <>
        {data2 ? (
            data2.age && data2.gender ? (
                <Profilecomponent />
            ) : (
                <Profileformcomponent />
            )
        ) : (
            <div className="ls login" id="login">
                <h1>Login</h1>
                <hr/>
                <p className="iep" id="iep" style={{display:"none"}}>Invalid email and password</p>
                <form className="form">
                    <input type="email" placeholder="Email" onChange={e=>setInputvals({...inputvals, email:e.target.value})} value={inputvals.email}/><br/>
                    <input type="password" placeholder="Password" onChange={e=>setInputvals({...inputvals, password:e.target.value})} value={inputvals.password}/><br/>
                    <button className="btn" onClick={handleLogin}>Login</button>
                </form>
                <p>Don't have an account <Link to="/">Register here</Link></p>
            </div>
        )}
        </>
    )
}
export default Logincomponent;