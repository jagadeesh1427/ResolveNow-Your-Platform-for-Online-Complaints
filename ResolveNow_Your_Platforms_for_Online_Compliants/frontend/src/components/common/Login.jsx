import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';
import '../styles/Login.css'; // CSS file for background and styles
//import bgImage from '../Images/Image2.png'; // Ensure this path is correct*/

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({ email: "", password: "" });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("http://localhost:8000/Login", user);
         alert("Successfully logged in");
         localStorage.setItem("user", JSON.stringify(res.data));
         const { userType } = res.data;
         switch (userType) {
            case "Admin":
               navigate("/AdminHome");
               break;
            case "Ordinary":
               navigate("/HomePage");
               break;
            case "Agent":
               navigate("/AgentHome");
               break;
            default:
               navigate("/Login");
               break;
         }
      } catch (err) {
         if (err.response && err.response.status === 401) {
            alert("User doesn’t exist");
         }
         navigate("/Login");
      }
   };

   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>ComplaintCare</Navbar.Brand>
               <ul className="navbar-nav d-flex flex-row gap-3">
                  <li className="nav-item">
                     <Link to="/" className="nav-link text-light">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/signup" className="nav-link text-light">SignUp</Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/login" className="nav-link text-light">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         <div className="login-wrapper" /*</>style={{ backgroundImage: `url(${bgImage})` }}*/ >
            <div className="login-form-container">
               <form onSubmit={handleSubmit} className="login-card">
                  <h2>Login For Registering the Complaint</h2>
                  <p>Please enter your Credentials!</p>
                  <input
                     type="email"
                     name="email"
                     placeholder="Email"
                     value={user.email}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     value={user.password}
                     onChange={handleChange}
                     required
                  />
                  <button type="submit">Log in</button>
                  <p className="signup-link">
                     Don’t have an account? <Link to="/SignUp">Register</Link>
                  </p>
               </form>
            </div>
         </div>

         <Footer />
      </>
   );
};

export default Login;
