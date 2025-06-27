import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';
import '../styles/HomePage.css'; // ✅ Ensure this path is correct

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('Complaint');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getData = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserName(user.name);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand text-light">Hi, {userName}</h1>
          <div className="mt-2 navbar-collapse text-light" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item mb-2">
                <NavLink
                  className={`nav-link text-light ${activeComponent === 'Complaint' ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick('Complaint')}
                >
                  Complaint Register
                </NavLink>
              </li>
              <li className="nav-item mb-2">
                <NavLink
                  className={`nav-link text-light ${activeComponent === 'Status' ? 'active' : ''}`}
                  onClick={() => handleNavLinkClick('Status')}
                >
                  Status
                </NavLink>
              </li>
            </ul>
          </div>
          <button className="btn btn-danger" onClick={Logout}>
            LogOut
          </button>
        </div>
      </nav>

      {/* Main Body with Gradient Background */}
      <div className="body d-flex flex-column justify-content-between">
        <div className="container my-4">
          {activeComponent === 'Complaint' && <Complaint />}
          {activeComponent === 'Status' && <Status />}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
