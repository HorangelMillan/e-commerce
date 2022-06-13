import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer>
            <p>© Academlo 2022</p>
            <div>
                <div><a href="https://github.com/HorangelMillan"><i className="fa-brands fa-github fa-xl"></i></a></div>
                <div><a href="https://www.linkedin.com/in/horangelmillan/"><i className="fa-brands fa-linkedin-in fa-xl"></i></a></div>
                <div><a href="https://web.facebook.com/HorangelMillanRamos/"><i className="fa-brands fa-facebook-f fa-xl"></i></a></div>
            </div>
        </footer>
    );
};

export default Footer;