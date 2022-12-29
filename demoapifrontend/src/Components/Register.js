import axios from 'axios';
import React, { useState } from 'react'

function Register() {
  const[regform,setregform]=useState([]);
  const changehandler=(e)=>{
    console.log(e.data);
    setregform({...regform,[e.target.name]:e.target.value})
    console.log(regform)
  }
  const saveclick=()=>{
    axios.
    post("https://localhost:7058/api/register",regform)
    .then((d)=>{
      console.log(d.data);
      alert("registered succeffully.")
    }).catch((e)=>{
      console.log(e);
    })
  }
  return (
    <div>
      <form className='form'>
        <div>
          <h1>register here</h1>
        </div>
        <div>
        <div><input  name="name" placeholder='enter your password 'onChange={changehandler}/></div>
          <div><input type="password" name="password" placeholder='enter your password 'onChange={changehandler}/></div>
          <div><input type="password" name="confirmpassword" placeholder='enter your password 'onChange={changehandler}/></div>
          <div><input  name="token" onChange={changehandler} /></div>
          <div>  <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={saveclick}
                >
                  register
                </button></div>
        </div>
      </form>
    </div>
  )
}

export default Register