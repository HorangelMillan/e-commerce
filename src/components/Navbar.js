import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/navbar.css';

const Navbar = () => {

    const [handleShow, setHandleShow] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const showSidebar = () => {
        if (token) {
            setHandleShow(!handleShow);
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <nav>
                <div><Link to="/"><strong>e-commerce</strong></Link></div>
                <Link to="/login"><div><i className="fa-solid fa-user fa-lg"></i></div></Link >
                <div onClick={() => showSidebar()}><i className="fa-solid fa-cart-shopping fa-lg"></i></div>
                <Link to="/purchase"><div><i className="fa-solid fa-store fa-lg"></i></div></Link >
            </nav>

            <Sidebar handleShow={handleShow} showSidebar={showSidebar} />
        </>
    );
};

export default Navbar;