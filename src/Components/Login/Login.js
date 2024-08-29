import React, { useState, useEffect } from 'react';
import './Login.css';
import LoginImage from '../LoginImage/LoginImage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/authSlice.js';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        if (e.target.name in input) {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                setInput({
                    email: '',
                    password: ''
                })
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('Error logging in');
            console.error("Error message:", error.message);
            console.error("Error config:", error.config);
            console.error("Error response:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);
    

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <LoginImage />
                <div className="login-form-container">
                    <div className="login-header">
                        <h1 className="logo">Instagram</h1>
                    </div>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="text"
                            name="email"
                            placeholder="Phone number, username, or email"
                            value={input.email}
                            onChange={changeEventHandler}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={changeEventHandler}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <div className="separator-container">
                        <hr className="separator" />
                        <span className="separator-text">OR</span>
                        <hr className="separator" />
                    </div>
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;