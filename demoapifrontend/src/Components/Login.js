import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import {
  json,
  Link,
  Navigate,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import Header from "./Header";
import Swal from "sweetalert2";

function Login() {
  const initData = {
    username: "",
    password: "",
  };

  const [loginForm, setloginForm] = useState(initData);
  const [registeredUsers, setregisteredUsers] = useState([]);
  const [loginFormError, setloginFormError] = useState(initData);
  const [rememberMe, setrememberMe] = useState(false);
  const navigate = useNavigate();
  let inputName=useRef(null);
  let inputPass=useRef(null);
  let inputCheck=useRef(null);
  


  const RegisteredUsers = () => {
    axios.get("https://localhost:7058/api/register").then((res) => {
      setregisteredUsers(res.data);
    });
  };
  useEffect(() => {
    RegisteredUsers();
    checksession();
  }, []);
  useEffect(() => {
  }, [rememberMe]);
  const checksession = () => {
    const item_val = sessionStorage.getItem("rememberMe");
    console.log(item_val);
    if (item_val == "true") {
      const item_val_name = sessionStorage.getItem("username");
      const item_val_pass = sessionStorage.getItem("password");
      //decrypt 
      const namebytes = CryptoJS.AES.decrypt(item_val_name, '');
      const passbytes=CryptoJS.AES.decrypt(item_val_pass,'');
      const decryptname=JSON.parse(namebytes.toString(CryptoJS.enc.Utf8));
      const decryptpass=JSON.parse(passbytes.toString(CryptoJS.enc.Utf8));

      inputName.current.value=decryptname;
      inputPass.current.value=decryptpass;
      inputCheck.current.checked=true;
      
      let obj={
        username:decryptname,
        password:decryptpass,
        rememberMe:item_val,
      }
      setloginForm(obj);
    }
    else{
      inputName.current.value='';
      inputPass.current.value='';
      inputCheck.current.checked=false
    }
  };
  const changeHandlercheckbox = (e) => {
    console.log(e);
    setrememberMe(!rememberMe);
  };  
  const changehandler = (e) => {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value });
    console.log(loginForm);
  };
  const saveclick = () => {
    if (rememberMe == true) {
      var encryptname = CryptoJS.AES.encrypt(JSON.stringify(loginForm.username),'').toString();
      var encryptpass = CryptoJS.AES.encrypt(JSON.stringify(loginForm.password),'').toString();
      sessionStorage.setItem("username", encryptname);
      sessionStorage.setItem("password", encryptpass);
      sessionStorage.setItem("rememberMe", rememberMe);
    }
    axios
      .post("https://localhost:7058/api/register/authenticate", loginForm)
      .then((e) => {
        localStorage.setItem("Token", e.data.token);
        Swal.fire({
          title: "Logined Successfully!!",
          text: "has been logined successfully.",
          icon: "success",
          showConfirmButton: false,
          confirmButtonColor: "#3085d6",
          timer: 900,
        });
        navigate("/employee");
      })
      .catch((e) => {
        console.log(e);
      });
    // RegisteredUsers();
    // let hasError = true;
    // let messages = initData;
    // registeredUsers.forEach((element) => {
    //   if (element.name == loginForm.username) {
    //     hasError = false;
    //     setloginFormError(initData);
    //   }
    // axios
    //   .post("https://localhost:7058/api/register/authenticate", loginForm)
    //   .then((e) => {
    //     localStorage.setItem("Token", e.data.token);
    //     Swal.fire({
    //       title: "Logined Successfully!!",
    //       text: "has been logined successfully.",
    //       icon: "success",
    //       showConfirmButton: false,
    //       confirmButtonColor: "#3085d6",
    //       timer: 900,
    //     });
    //     navigate("/employee");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // });
    // if (hasError) {
    //   console.log("error accured");
    //   messages = { ...messages, username: "Wrong username" };
    //   setloginFormError(messages);
    // }
  };
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Header />
      <form className="form" onSubmit={submit}>
        <div>
          <h1>login here</h1>
        </div>
        <div>
          <div>
            <input
              type="text"
              ref={inputName}
              name="username"
              required
              onChange={changehandler}
            />
            <p className="text-danger">{loginFormError.username}</p>
          </div>
          <div>
            <input
              type="password"
              name="password"
              ref={inputPass}
              required
              onChange={changehandler}
            />
            <p className="text-danger">{loginFormError.password}</p>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              onClick={saveclick}
            >
              login
            </button>
          </div>
          <div>
            <input
              type="checkbox"
              name="rememberMe"
              ref={inputCheck}
              onClick={changeHandlercheckbox}
            />
            remember me?
          </div>
          <div>
            <small>
              haven't registerd?<Link to="/register">Clich here</Link>
            </small>
          </div>
        </div>
      </form>
      {/* {cookies.username}&&{cookies.password} */}
    </div>
  );
}

export default Login;
