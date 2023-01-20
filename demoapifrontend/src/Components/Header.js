import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
function Header() {
  const navigate=useNavigate();
  const[user,setuser]=useState();
  useEffect(()=>{  
    //check token 
    let usr=localStorage.getItem("Token");
    if(usr){
      setuser(usr);
    }
  },[]);

  // const userinfo=sessionStorage.getItem('username');
  //decrypt
  // const namebytes=CryptoJS.AES.decrypt(userinfo,'');
  // const decryptname=JSON.parse(namebytes.toString(CryptoJS.enc.Utf8));

  const logout=()=>{
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">              
            <Link to=" "className="text-captalize" id="logo">Demo Api Project</Link>
          </ul>
          {/* {decryptname&&user?(<h5>welcome &nbsp; {decryptname}</h5>):null} */}
          {user?(<div></div>):(<Link to="/register"className="nav-link text-white text-captalize">register</Link>)}
          {user?(<a onClick={logout} className="nav-link text-white text-captalize">logout</a>):
            (<Link to="/login" className="nav-link text-white text-captalize">login</Link>)} 
            <Link to="/test"className="nav-link text-danger text-captalize">test</Link>
            <Link to="/singledataset"className="nav-link text-danger text-captalize">singledataset</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
