import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/authSlice';
import { setMessages } from '../../redux/chatSlice';
import axios from 'axios';
import { MessageCircleCode } from 'lucide-react';
import Messages from '../Chat/Message';
import './MessageChat.css';

const MessageChat = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    }, []);

    return (
        <div className="chat-container">
            <section className="sidebar">
                <h1 className="sidebar-header">{user?.username}</h1>
                <hr className="sidebar-hr" />
                <div className="sidebar-content">
                    {suggestedUsers.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id);
                        console.log(isOnline); // Check if this is correctly returning true/false
                        return (
                            <div onClick={() => dispatch(setSelectedUser(suggestedUser))} key={suggestedUser?._id} className="suggested-user">
                                <div className="avatar">
                                    {suggestedUser?.profilePhoto ? (
                                        <img src={suggestedUser?.profilePhoto || 'https://via.placeholder.com/40'} alt="profile" />
                                    ) : (
                                        <span>CN</span>
                                    )}
                                </div>
                                <div className="user-info">
                                    <span className="font-medium">{suggestedUser?.username}</span>
                                    <span className={isOnline ? "online-status" : "offline-status"}>
                                        {isOnline ? "Online" : "Offline"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            {selectedUser ? (
                <section className="chat-section">
                    <div className="chat-header">
                        <div className="avatar">
                            {selectedUser?.profilePhoto ? (
                                <img src={selectedUser?.profilePhoto} alt="profile" />
                            ) : (
                                <span>CN</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span>{selectedUser?.username}</span>
                        </div>
                    </div>
                    <Messages selectedUser={selectedUser} />
                    <div className="chat-footer">
                        <input
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            type="text"
                            className="chat-input"
                            placeholder="Messages..."
                        />
                        <button onClick={() => sendMessageHandler(selectedUser?._id)} className="chat-button">
                            Send
                        </button>
                    </div>
                </section>
            ) : (
                <div className="empty-chat">
                    <MessageCircleCode className="empty-chat-icon" />
                    <h1 className="empty-chat-title">Your messages</h1>
                    <span className="empty-chat-subtitle">Send a message to start a chat.</span>
                </div>
            )}
        </div>
    );
};

export default MessageChat;
