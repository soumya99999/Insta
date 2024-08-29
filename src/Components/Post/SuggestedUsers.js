import React from 'react';
import './SuggestedUsers.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector(store => store.auth);

  if (!suggestedUsers || suggestedUsers.length === 0) {
    return <p>No suggested users available.</p>; 
  }


  return (
    <div className="suggested-users">
      <h4>Suggested Users</h4>
      <ul>
        {suggestedUsers.map((user) => (
          <li key={user?._id} className="suggested-user">
            <Link to={`/profile/${user?._id}`}>
            <img src={user?.profilePhoto || "https://via.placeholder.com/40"} alt={`${user?.username}'s profile`} className="user-photo" />
            </Link>
            <span className="username">{user?.username}</span>
            <button className="follow-btn">Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
