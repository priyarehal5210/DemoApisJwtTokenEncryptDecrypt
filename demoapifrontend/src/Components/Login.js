import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, Navigate, useNavigate } from "react-router-dom";

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
      // console.log("old",element.name);
      //console.log("new",loginForm.username);
            if (element.name==loginForm.username) {
              hasError = false;
              setloginFormError(initData);
              axios
              .post("https://localhost:7058/api/register/authenticate", loginForm)
              .then((e) => {
                alert("logined");
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

  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <pre>{JSON.stringify(loginForm)}</pre>
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
        </div>
      </form>
      <div>
      </div>
    </div>
  );
}

export default Login;
