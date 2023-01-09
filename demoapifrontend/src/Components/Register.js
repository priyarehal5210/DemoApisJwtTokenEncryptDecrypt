import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Swal from "sweetalert2";
function Register() {
  const initData = {
    name: "",
    password: "",
    confirmpassword: "",
    token:""
  };
  const [registerForm, setregisterForm] = useState(initData);
  const [registeredUsers, setregisteredUsers] = useState([]);
  const [registerFormError, setregisterFormError] = useState(initData);
  const navigate = useNavigate();
  const changehandler = (e) => {
    setregisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const RegisteredUsers = () => {
    // debugger;
    axios.get("https://localhost:7058/api/register").then((res) => {
      setregisteredUsers(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    RegisteredUsers();
  }, []);
  const saveclick = () => {
    RegisteredUsers();
    let hasError = false;
    let messages = initData;
    registeredUsers.forEach((element) => {
      if (element.name == registerForm.name) {
        hasError = true;
        messages = { ...messages, name: "User in use" };
      }
    });
    if (registerForm.name.trim().length == 0) {
      hasError = true;
      messages = { ...messages, name: "enter username" };
    }
    if (registerForm.password.trim().length == 0) {
      hasError = true;
      messages = { ...messages, password: "enter password" };
    }
    if (registerForm.confirmpassword.trim().length == 0) {
      hasError = true;
      messages = { ...messages, confirmpassword: "enter password" };
    }
    if (registerForm.password != registerForm.confirmpassword) {
      hasError = true;
      messages = { ...messages, confirmpassword: "password not matched" };
    }
    if (hasError) {
      setregisterFormError(messages);
    } else {
      setregisterFormError(initData);
      axios
        .post("https://localhost:7058/api/register", registerForm)
        .then((d) => {
          Swal.fire({  
            position: 'top-end',  
            icon: 'success',  
            title: 'Your work has been saved',  
            showConfirmButton: false,  
            timer: 1500  
          });  
          //alert("registered succeffully.");
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      <Header/>
      <form className="form">
        <div>
          <h1>register here</h1>
        </div>
        <div>
          <div>
            <input name="name" onChange={changehandler} placeholder="enter username"/>
            <p className="text-danger">{registerFormError.name}</p>
          </div>
          <div>
            <input type="password" name="password" onChange={changehandler} placeholder="enter password"/>
            <p className="text-danger">{registerFormError.password}</p>
          </div>
          <div>
            <input
              type="password"
              name="confirmpassword"
              onChange={changehandler}
              placeholder="enter confirm password"
            />
            <p className="text-danger">{registerFormError.confirmpassword}</p>
          </div>
          {/* <div>
            <input name="token" onChange={changehandler} />
          </div> */}
          <div>
            <button type="button" class="btn " onClick={saveclick}>
              register
            </button>
            <Link className="btn btn-dark text-captalize" id="logginbtn" to="/login">
              login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;
