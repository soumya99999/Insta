import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { RingLoader } from 'react-spinners'; 
import './SignUp.css'; 
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        setSuccess(null);
        console.log('Form data:', formData);

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if(res.data.success){
                navigate('/login');
                alert('Registration successful. Please login to continue.');
                setFormData({
                    email: '',
                    username: '',
                    password: '',
                })
            }

            console.log(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? (
                        <RingLoader color="#fff" size={24} />
                    ) : (
                        'Sign Up'
                    )}
                </button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            <p className="login-link">
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
};

export default SignUp;
