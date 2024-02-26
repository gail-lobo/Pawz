import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer" >
    <img src="/pawz_logo.png" alt="Footer Image" height={70} style={{ marginBottom: '20px' }}/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="contact-info">
              <li><a href="mailto:pet_supplies@pawz.com" className="email-link"><i className="fa fa-envelope"></i> pet_supplies@pawz.com</a></li>
              <li>  <i className="fa fa-phone"></i> +1 123 456 7890 </li>
              <li><i className="fa fa-map-marker"></i> 27 Warner Street, Pet Paradise</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="text-center">&copy; 2023 Pawz Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}



export default Footer;
