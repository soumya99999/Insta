// src/components/LoginImage/LoginImage.js
import React from 'react';
import './LoginImage.css';
import loginImage from "../../assets/LoginImage.png"

const LoginImage = () => {
  return (
    <div className="login-image-container">
      <img
        src={loginImage} 
        alt="Instagram"
        className="login-image"
      />
    </div>
  );
};

export default LoginImage;
