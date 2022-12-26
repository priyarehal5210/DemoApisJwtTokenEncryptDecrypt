import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Register() {
    const[user,setuser]=useState([]);
    const[userform,setuserform]=useState({});
    const getall=()=>{
        axios.get("https://localhost:7058/api/register").then((d)=>{setuser(d.data)}).catch((e)=>{
            console.log(e);
        })
    }
    const saveclick=()=>{
        axios
        .post("https://localhost:7058/api/register",userform)
        .then((d)=>{
            console.log(d);
            getall();
        }).catch((e)=>{
            console.log(e);
        })
    }
    const changeHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setuserform({ ...userform, [e.target.name]: e.target.value });
        console.log(userform);
    
      };
    useEffect(()=>{
        getall();
    })
  return (
    <div>
        <div>
            <form>
                <input placeholder='enter name' type="text" onChange={changeHandler} name="name"/>
                <input placeholder='enter password' type="password" onChange={changeHandler} name="password"/>
                <input placeholder='enter confirm password' type="password" onChange={changeHandler}name="confirmpassword"/>
                <input placeholder='enter confirm password' type="text" onChange={changeHandler}name="role"/>
                <input placeholder='enter confirm password' type="text" onChange={changeHandler}name="token"/>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={saveclick}
                >
                  save
                </button>            </form>
        </div>
    </div>
  )
}

export default Register