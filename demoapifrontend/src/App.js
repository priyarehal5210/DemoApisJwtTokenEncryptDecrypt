import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Employee from './Components/Employee';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
     <Header/>
     <Routes>
      <Route path='/employee' element={<Employee/>}></Route>
      <Route path='/register'element={<Register/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
