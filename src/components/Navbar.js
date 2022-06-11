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
            setHandleShow(!handleShow)
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <nav>
                <Link to="/"><strong>e-commerce</strong></Link>
                <Link to="/login"><i className="fa-solid fa-user fa-lg"></i></Link >
                <i onClick={() => showSidebar()} className="fa-solid fa-cart-shopping fa-lg"></i>
                <Link to="/purchase"><i className="fa-solid fa-store fa-lg"></i></Link >
            </nav>

            <Sidebar handleShow={handleShow} showSidebar={showSidebar} />
        </>
    );
};

export default Navbar;