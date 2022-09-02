import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Signupcomponent(){
    const [signupData,setSignupData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [getEmail,setGetEmail] = useState('');
    useEffect(()=>{
        fetch("https://guvi-backend.vercel.app/getDetails").then(res=>{
            return res.json()
        }).then(data=>setGetEmail(data));
    },[])
    console.log(getEmail);

    var fullname = document.getElementById('fullname');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var cpassword = document.getElementById('cpassword');
    var es = document.getElementById("es");
    var rs = document.getElementById("rs");
    var signup = document.getElementById("signup");
    var namepattern = /^[a-zA-Z]{4,}$/;
    var emailpattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;
    //var numberpattern = /^\d{10}$/;
    var passpattern = /^[A-Za-z0-9]\w{5,}$/;

    var handleSubmit = (e) => {
        e.preventDefault();
        /*Validating the input value*/
        if(!namepattern.test(fullname.value)){
            fullname.style.border = "1px solid red";
            alert("Enter valid username");
        }else if(!emailpattern.test(email.value)){
            fullname.style.border = "none";
            alert("Enter valid mail address");
            email.style.border = "1px solid red";
        }else if(!passpattern.test(password.value)){
            email.style.border = "none";
            password.style.border = "1px solid red";
            alert("password should contain 6 characters. Should not contain special characters, space.");
        }else if(password.value !== cpassword.value){
            password.style.border = "none";
            cpassword.style.border = "1px solid red";
            alert("Password didn't matched");
        }else {
            fullname.style.border = "none";
            email.style.border = "none";
            password.style.border = "none";
            cpassword.style.border = "none";
            
            for(var i=0; i<getEmail.length; i++){
                console.log(getEmail[i].email);
                var mail = getEmail[i].email;
                if(mail === signupData.email){
                    es.style.display = "block";
                    rs.style.display = "none";
                    signup.style.margin = "auto";
                    break;
                }
            }
            if(mail !== signupData.email){
                const res = fetch("https://guvi-backend.vercel.app/addDetails", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: signupData.fullname,
                        email: signupData.email,
                        password: signupData.password,
                        confirmPassword: signupData.confirmPassword
                    })
                })
                console.log(res);
                es.style.display = "none";
                rs.style.display = "block";
                signup.style.margin = "auto";
                setSignupData({fullname: '', email: '', password: '', confirmPassword: ''});
            }
        }
    }
    return(
        <>
        <p className="rs" id="es" style={{display:"none"}}>Email already exsist. Please click on Login</p>
        <p className="rs" id="rs" style={{display:"none"}}>Registered successfully</p>
        <div className="ls signup" id='signup'>
            <h1>Sign Up</h1>
            <hr/>
            <form className="form" onSubmit={handleSubmit}>
                <input id="fullname" type="text" placeholder="Full Name" onChange={e=>setSignupData({...signupData, fullname:e.target.value})} value={signupData.fullname}/><br/>
                <input id="email" type="email" placeholder="Email" onChange={e=>setSignupData({...signupData, email:e.target.value})} value={signupData.email}/><br/>
                <input id="password" type="password" placeholder="Password" onChange={e=>setSignupData({...signupData, password:e.target.value})} value={signupData.password} /><br/>
                <input id="cpassword" type="password" placeholder="Confirm Password" onChange={e=>setSignupData({...signupData, confirmPassword:e.target.value})} value={signupData.confirmPassword}/><br/>
                <button className="btn">Signup</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
        </>
    )
}
export default Signupcomponent;