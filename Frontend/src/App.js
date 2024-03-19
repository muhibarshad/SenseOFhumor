import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/profile'
import ProtectedRoute from './components/protectedRoute'
import Error from './components/error';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const loginHandler  = (val)=>{
    setIsLoggedIn(val);
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login  loginHandler={loginHandler}/>}/>
        <Route path="/sign-up" element={<Signup loginHandler={loginHandler}/>}/>
        <Route path="/403-forbidden-error" element={<Error/>}/>
        <Route path='/profile' element={<ProtectedRoute condition={isLoggedIn} redirectTo="/403-forbidden-error">
          <Profile/>
        </ProtectedRoute>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
