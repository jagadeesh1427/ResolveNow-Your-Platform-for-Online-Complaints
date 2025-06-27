import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Footer from './FooterC';
import '../styles/SignUp.css'; // Make sure your CSS includes the gradient-custom and glass-card classes

const SignUp = () => {
   const [title, setTitle] = useState("Select User")
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   })

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   }

   const handleTitle = (select) => {
      setTitle(select)
      setUser({ ...user, userType: select });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const updatedUser = { ...user, userType: title };
      axios.post("http://localhost:8000/SignUp", updatedUser)
         .then((res) => {
            alert("Record submitted")
            console.log(res.data.user)
         })
         .catch((err) => {
            console.log(err)
         })
      setUser({
         name: "",
         email: "",
         password: "",
         phone: "",
         userType: ""
      })
   }

   return (
      <>
         <Navbar bg="dark" variant="dark">
            <Container>
               <Navbar.Brand>ComplaintCare</Navbar.Brand>
               <ul className="navbar-nav flex-row">
                  <li className="nav-item mx-2">
                     <Link to="/" className="nav-link text-light">Home</Link>
                  </li>
                  <li className="nav-item mx-2">
                     <Link to="/signup" className="nav-link text-light">SignUp</Link>
                  </li>
                  <li className="nav-item mx-2">
                     <Link to="/login" className="nav-link text-light">Login</Link>
                  </li>
               </ul>
            </Container>
         </Navbar>

         <section className="gradient-custom">
            <div className="glass-card">
               <h2 className="fw-bold mb-4">SignUp For Registering the Complaint</h2>
               <p className="text-white-50 mb-4">Please enter your Details</p>

               <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                     <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" placeholder="Full Name" required />
                     <label className="form-label">Full Name</label>
                  </div>

                  <div className="form-outline mb-4">
                     <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                     <label className="form-label">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                     <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                     <label className="form-label">Password</label>
                  </div>

                  <div className="form-outline mb-4">
                     <input type="tel" name="phone" value={user.phone} onChange={handleChange} className="form-control" placeholder="Mobile No." required />
                     <label className="form-label">Mobile No.</label>
                  </div>

                  <div className="form-outline mb-4">
                     <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                           {title}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                           <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                           <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                           <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                     <label className="form-label mt-2">Select User Type</label>
                  </div>

                  <button className="btn btn-outline-light btn-lg w-100 mt-3" type="submit">Register</button>
               </form>

               <p className="mt-4 mb-0">Had an account? <Link to="/login" className="text-light">Login</Link></p>
            </div>
         </section>

         <Footer />
      </>
   )
}

export default SignUp
