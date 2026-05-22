import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import showNotification from './common/Notification';
import { apiUrl } from '../utils/api';

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();

    setErr(null);
    const user = {
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password,
    };

    try {
      const response = await axios.post(apiUrl('/api/signup'), user);
      if (response.data.msg === "success") {
        showNotification('success', "Registered Successfully! Please login to continue.");
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErr("Email already exists");
      } else {
        setErr("Something went wrong, please try again");
      }
    }
  };
  return (
       <div className="container-fluid">
      <div className="row ">
        <div className="col-sm-12 login ">
           <img src="/flower.png"  style={{ position: "absolute", zIndex: 1 ,right:"0", bottom:"0"}}  height={"250px"} alt="" />
          <img src="/flower2.png"  style={{ position: "absolute", zIndex: 1 ,left:"0", top:"0"}}  height={"250px"} alt="" />
          
          <form onSubmit={handleFormData} className='p-4 '>
            <h3 className='text-center'>Sign up </h3>
            <br />
            
            <input type="text"  placeholder="Name" style={{color:'white'}} value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control rounded-3 border border-secondary bg-transparent" />
            <br />
            <input type="email"  placeholder="Email" style={{color:'white'}} value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control rounded-3 border border-secondary bg-transparent" />
            <br />
            <input type="password" placeholder="Password" style={{color:'white'}} value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control rounded-3 border border-secondary bg-transparent " />
            <br />
            <p className='text-danger'>{err}</p>
            <input type="submit" value="Sign up" className="form-control btn btn-primary" />
            <br /><br />
             <div className="w-100 text-center">
          Need an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </div>

          </form>
        </div>
       
      </div>
    </div>
  )
}

export default Signup
