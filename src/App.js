
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
      <Route path='/home' element={
      <PrivateRoute><Home></Home></PrivateRoute>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
    </Routes>

    </>
  );
}

export default App;
