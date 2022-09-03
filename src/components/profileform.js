import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logincomponent from './login';
import Profilecomponent from "./profile";

function Profileformcomponent(){
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('logindetails'));
    const [inputValues,setInputValues] = useState({
        age: '',
        gender: '',
        mobile: '',
        city: ''
    });

    var handleData = (e) => {
        e.preventDefault();
        fetch(`https://guvi-backend.vercel.app/addDetails/${data.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: inputValues.age,
                gender: inputValues.gender,
                mobile: inputValues.mobile,
                city: inputValues.city
            })
        })
        navigate('/profile');
    }
    return(
        <>
        {data ? ( data.age && data.gender ? (
            <Profilecomponent />
        ) : (
            <div className="ls profileform">
                <h1>Profile</h1>
                <form className="form">
                    <input type="number" placeholder="Age" onChange={e=>setInputValues({...inputValues, age:e.target.value})} value={inputValues.age} /><br/>
                    Gender:
                    <input type="radio" value="male" name="gender" onClick={e=>setInputValues({...inputValues, gender:e.target.value})} style={{width:"8%"}}/>Male
                    <input type="radio" value="female" name="gender" onClick={e=>setInputValues({...inputValues, gender:e.target.value})} style={{width:"8%"}}/>Female
                    <input type="radio" value="other" name="gender" onClick={e=>setInputValues({...inputValues, gender:e.target.value})} style={{width:"8%"}}/>Other<br/>
                    <input type="number" placeholder="Mobile Number" onChange={e=>setInputValues({...inputValues, mobile:e.target.value})} value={inputValues.mobile}/><br/>
                    <input type="text" placeholder="City" onChange={e=>setInputValues({...inputValues, city:e.target.value})} value={inputValues.city}/><br/>
                    <button onClick={handleData} className="btn">Update</button>  
                </form>
            </div>
        )
        ) : (
            <Logincomponent />
        )}
        </>
    )
}
export default Profileformcomponent;