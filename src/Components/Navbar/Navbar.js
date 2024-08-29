import React from 'react';
import { FaHome, FaSearch, FaCompass, FaVideo, FaPaperPlane, FaHeart, FaPlusSquare, FaUser, FaInstagram, FaSignOutAlt } from 'react-icons/fa'; // Import the logout icon
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector from Redux
import { setAuthUser } from '../../redux/authSlice';

const size = 26;

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userProfile, user } = useSelector(store => store.auth);

    const logOutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                navigate('/login');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const goToMessageChat = () => {
        navigate('/message-chat'); 
    };

    return (
        <div className="navbar">
            <div className="logo">
                <FaInstagram size={36} />
            </div>
            <div className="menu">
                <div className="menu-item">
                    <FaHome size={size} />
                </div>
                <div className="menu-item">
                    <FaSearch size={size} />
                </div>
                <div className="menu-item explore-icon">
                    <FaCompass size={size} />
                </div>
                <div className="menu-item">
                    <FaVideo size={size} />
                </div>
                <div className="menu-item">
                    <FaPaperPlane size={size} onClick={goToMessageChat} />
                </div>
                <div className="menu-item">
                    <FaHeart size={size} />
                </div>
                <div className="menu-item">
                    <FaPlusSquare size={size} />
                </div>
                <div className="menu-item">
                    {userProfile?.profilePhoto ? (
                        <img 
                            src={userProfile.profilePhoto} 
                            alt="User Profile" 
                            className="user-profile-photo"
                            onClick={() => navigate(`/profile/${user?._id}`)} // Navigate to profile on click
                        />
                    ) : (
                        <FaUser size={size} onClick={() => navigate(`/profile/${user?._id}`)} />
                    )}
                </div>
                <div className="menu-item logout-icon" onClick={logOutHandler}>
                    <FaSignOutAlt size={size} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
