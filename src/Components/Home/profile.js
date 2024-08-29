import React, { useState } from 'react';
import useGetUserProfile from '../../Hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './profile.css';  // Import the CSS file

const Profile = () => {
    const params = useParams();
    const userId = params.id;
    useGetUserProfile(userId);
    const [activeTab, setActiveTab] = useState('posts');

    const { userProfile, user } = useSelector(store => store.auth);
    console.log(userProfile);

    const isLoggedInUserProfile = user?._id === userProfile?._id;
    const isFollowing = false;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

    return (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-header'>
                    <section className='profile-avatar'>
                        <img
                            src={userProfile?.profilePhoto ||  'https://via.placeholder.com/40'}
                            alt="profilePhoto"
                            className='profile-image'
                        />
                    </section>
                    <section>
                        <div className='profile-info'>
                            <div className='profile-info-top'>
                                <span>{userProfile?.username}</span>
                                {
                                    isLoggedInUserProfile ? (
                                        <>
                                            <Link to="/account/edit"><button className='btn edit-button'>Edit profile</button></Link>
                                            <button className='btn archive-button'>View archive</button>
                                            <button className='btn tools-button'>Ad tools</button>
                                        </>
                                    ) : (
                                        isFollowing ? (
                                            <>
                                                <button className='btn unfollow-button'>Unfollow</button>
                                                <button className='btn message-button'>Message</button>
                                            </>
                                        ) : (
                                            <button className='btn follow-button'>Follow</button>
                                        )
                                    )
                                }
                            </div>
                            <div className='profile-stats'>
                                <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                                <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                                <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
                            </div>
                            <div className='profile-bio'>
                                <span className='bio-text'>{userProfile?.bio || 'bio here...'}</span>
                                <div className='username-badge'><span>@</span><span className='pl-1'>{userProfile?.username}</span></div>
                                <span>🤯Learn code with patel mernstack style</span>
                                <span>🤯Turing code into fun</span>
                                <span>🤯DM for collaboration</span>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='profile-tabs-container'>
                    <div className='profile-tabs'>
                        <span className={`tab-item ${activeTab === 'posts' ? 'active-tab' : ''}`} onClick={() => handleTabChange('posts')}>
                            POSTS
                        </span>
                        <span className={`tab-item ${activeTab === 'saved' ? 'active-tab' : ''}`} onClick={() => handleTabChange('saved')}>
                            SAVED
                        </span>
                        <span className={`tab-item ${activeTab === 'reels' ? 'active-tab' : ''}`} onClick={() => handleTabChange('reels')}>
                            REELS
                        </span>
                        <span className={`tab-item ${activeTab === 'tags' ? 'active-tab' : ''}`} onClick={() => handleTabChange('tags')}>
                            TAGS
                        </span>
                    </div>
                    <div className='profile-posts-grid'>
                        {
                            displayedPost?.map((post) => {
                                return (
                                    <div key={post?._id} className='post-item'>
                                        <img src={post.image} alt='postimage' className='post-image' />
                                        <div className='post-overlay'>
                                            <div className='post-interactions'>
                                                <button className='interaction-item'>
                                                    ❤️
                                                    <span>{post?.likes.length}</span>
                                                </button>
                                                <button className='interaction-item'>
                                                    💬
                                                    <span>{post?.comments.length}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
