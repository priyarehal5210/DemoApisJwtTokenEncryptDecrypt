import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, Link, Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const RegisteredUsers = () => {
    axios.get("https://localhost:7058/api/register").then((res) => {
      setregisteredUsers(res.data);
    });
  };
useEffect(()=>{
  RegisteredUsers();
},[])
  const changehandler = (e) => {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value });
    console.log(loginForm);
  };
  const saveclick = () => {
    //debugger;
    RegisteredUsers();
    let hasError = true;
    let messages =initData;

    registeredUsers.forEach((element) => {
            if (element.name==loginForm.username) {
              hasError = false;
              setloginFormError(initData);
              axios
              .post("https://localhost:7058/api/register/authenticate", loginForm)
              .then((e) => {
                localStorage.setItem("Token",e.data.token);
                Swal.fire({  
                  title: 'Logined Successfully!!',  
                  text: 'User has been logined successfully.',  
                  icon: 'success',  
                  showConfirmButton: false, 
                  confirmButtonColor: '#3085d6',  
                  timer:900
                });  
                navigate("/employee");
              })
              .catch((e) => {
                console.log(e);
              });          
            }
          })
          if(hasError) {
            console.log("error accured")
            messages={...messages,username:"Wrong username"}
              setloginFormError(messages);
          }
        }
        console.log(loginForm);
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Header/>
      {/* <pre>{JSON.stringify(loginForm)}</pre> */}
      <form className="form" onSubmit={submit}>
        <div>
          <h1>login here</h1>
        </div>
        <div>
          <div>
            <input
              name="username"
              placeholder="enter username"
              onChange={changehandler}
              value={loginForm.username}
            />
            <p className="text-danger">{loginFormError.username}</p>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="enter userpassword "
              value={loginForm.password}
              onChange={changehandler}
            />
            <p className="text-danger">{loginFormError.password}</p>
          </div>
          <div>
            {" "}
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
            <small>haven't registerd?<Link to="/register">Clich here</Link></small>
          </div>
        </div>
      </form>
      <div>
      </div>
    </div>
  );
}

export default Login;