import './App.css';
import { Route, Routes,redirect } from 'react-router-dom';
import Employee from './Components/Employee';
import Register from './Components/Register';
import Login from './Components/Login';
import Test from './Components/Test';
import SingleDataset from './Components/SingleDataset';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const[ip,setip]=useState();
  useEffect(()=>{
    getuserip();
  },[])
  const getuserip=async()=>{
    const ip=await axios.get("https://ipapi.co/json");
    console.log(ip.data.ip);
    setip(ip.data.ip);
  }
  return (
    <div className="App">
        
     <Routes>
     <Route path='/'element={<Login/>}/>
      <Route exact path='/employee' element={<Employee/>}></Route>
      <Route path='/register'element={<Register/>}></Route>
      <Route path='/login'element={<Login/>}></Route>
      <Route path='/test' element={<Test/>}></Route>
      <Route path='/singledataset' element={<SingleDataset/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
