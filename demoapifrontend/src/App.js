import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Employee from './Components/Employee';

function App() {
  return (
    <div className="App">
     <Header/>
     <Routes>
      <Route path='/employee' element={<Employee/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
