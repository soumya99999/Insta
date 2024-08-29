import React from 'react';
import { FaHome, FaSearch, FaVideo, FaPaperPlane, FaHeart, FaUser } from 'react-icons/fa';
import './MobileNavbar.css';

const size = 26;

const MobileNavbar = () => {
    return (
        <div className="mobile-navbar">
            <div className="top-navbar">
                <div className="left-icons">
                    <div className="insta-text">Instagram</div>
                </div>
                <div className="right-icons">
                    <div className="menu-item">
                        <FaHeart size={size} />
                    </div>
                    <div className="menu-item">
                        <FaPaperPlane size={size} />
                    </div>
                </div>
            </div>
            <div className="bottom-navbar">
                <div className="menu-item">
                    <FaHome size={size} />
                </div>
                <div className="menu-item">
                    <FaSearch size={size} />
                </div>
                <div className="menu-item">
                    <FaVideo size={size} />
                </div>
                <div className="menu-item">
                    <FaUser size={size} />
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;
