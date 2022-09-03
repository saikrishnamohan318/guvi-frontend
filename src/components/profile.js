import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logincomponent from "./login";

function Profilecomponent(){
    const navigate = useNavigate();
    const data1 = JSON.parse(localStorage.getItem('logindetails'));
    const [getData,setGetData] = useState({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        city: ''
    })
    useEffect(()=>{
        if(data1){
            fetch(`https://guvi-backend.vercel.app/getDetails/${data1.email}`).then(res=>{
                return res.json();
            }).then(data=>data.map((d)=>setGetData({name:d.name, age:d.age, gender:d.gender, mobile:d.mobile, city:d.city})))
        }
    },[])
    var delUser = () => {
        localStorage.removeItem('logindetails');
        navigate('/login');
    }
    return(
        <>
        {data1 ? (
            getData && 
            <div className="ls profile">
                <h1>Profile</h1>
                <hr/>
                <div className="welbtn">
                    <p style={{fontSize:"28px"}}>Welcome {getData.name}</p>
                    <button className="lgbtn" onClick={delUser}>Logout</button>
                </div>
                <p>Age : <span>{getData.age}</span></p>
                <p>Gender : <span>{getData.gender}</span></p>
                <p>Mobile : <span>{getData.mobile}</span></p>
                <p>City : <span>{getData.city}</span></p>
            </div>
        ) : (
            <Logincomponent />
        )}
        </>
    )
}
export default Profilecomponent;