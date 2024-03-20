import { Route, Routes, useNavigate, } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import Profile from './pages/dashboard/dashboard'
import ProtectedRoute from './components/protectedRoute'
import Error from './components/error';
import { useEffect, useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const navigate = useNavigate()
  const loginHandler  = (val)=>{
    setIsLoggedIn(val);
  }
  useEffect(()=>{
    async function auth(){
      const token = localStorage.getItem('token')
      console.log(token)
      if(token){
      const user=  await fetch('http://localhost:3002/auth-user',{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      if(user){
        setIsLoggedIn(true);
        navigate('/dashboard')
      }
      }
    }
    auth();
  },[navigate])
  return (
      <Routes>
        <Route path="/" element={<Login loginHandler={loginHandler}/>}/>
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />
        <Route path="/sign-up" element={<Signup loginHandler={loginHandler}/>}/>
        <Route path="/403-forbidden-error" element={<Error/>}/>
        <Route path='/dashboard' element={<ProtectedRoute condition={isLoggedIn} redirectTo="/403-forbidden-error">
          <Profile/>
        </ProtectedRoute>}></Route>
      </Routes>
  );
}

export default App;
