import React from 'react';
import './RightSidebar.css';
import SuggestedUsers from '../Post/SuggestedUsers';
import { useSelector } from 'react-redux';

const RightSidebar = () => {
  const { userProfile, user} = useSelector(store => store.auth);

  return (
    <div className="right-sidebar"> 
      {user && (
        <div className="user-info">
          <img src={userProfile?.profilePhoto || 'https://via.placeholder.com/40'} alt="User_Photo" />
          <span className="username">{user?.username}</span>
        </div>
      )}
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;