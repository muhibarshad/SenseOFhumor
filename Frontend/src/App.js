import { Route, Routes, useNavigate, } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import ProtectedRoute from './components/protectedRoute'
import Error from './components/error';
import SOHPage from './pages/Card/SOHPage';
import YourCard from './pages/Card/card';
import { useEffect, useState } from 'react';
import FinalCard from './pages/DevCard/finalCard';
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [isCard, setIsCard]=useState(false);
  const [data, setData]=useState('');
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
  },[])
  return (
      <Routes>
        <Route path="/" element={<Login loginHandler={loginHandler}/>}/>
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />
        <Route path="/sign-up" element={<Signup loginHandler={loginHandler}/>}/>
        <Route path="/403-forbidden-error" element={<Error/>}/>
        <Route path='/dashboard'  element={<ProtectedRoute condition={isLoggedIn} redirectTo="/403-forbidden-error">
          <SOHPage value={isCard}  data={data}/>
        </ProtectedRoute>}></Route>
        <Route path='/your-card'  element={<ProtectedRoute condition={isLoggedIn} redirectTo="/403-forbidden-error">
          <YourCard data={data} setData={setData} setIsCard={setIsCard} value={isCard} />
        </ProtectedRoute>}></Route>
        <Route path='/card' element={<ProtectedRoute condition={isLoggedIn} redirectTo="/403-forbidden-error">
          <FinalCard value={isCard} data={data} />
        </ProtectedRoute>}></Route>
      </Routes>
  );
}

export default App;
