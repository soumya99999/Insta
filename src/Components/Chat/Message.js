import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '../../Hooks/useGetAllMessage';
import useGetRTM from '../../Hooks/useGetRTM';
import './Message.css';  

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();

    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);

    // Add these console logs here
    console.log('Selected User:', selectedUser);
    console.log('Current User:', user);

    return (
        <div className="messages-container">
            <div className="user-info-container">
                <div className="user-info">
                    <div className="avatar">
                        <img
                            src={selectedUser?.profilePhoto || 'https://via.placeholder.com/80'}
                            alt="profile"
                            className="profile-image"
                        />
                    </div>
                    <span className="username">{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`} className="view-profile-button">
                        View profile
                    </Link>
                </div>
            </div>
            <div className="messages">
                {
                messages && messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`message-container ${msg.senderId === user?._id ? 'sent' : 'received'}`}
                    >
                        <div
                            className={`message-bubble ${msg.senderId === user?._id ? 'sent' : 'received'}`}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
