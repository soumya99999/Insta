import React from 'react';
import Post from '../Post/Post';
import '../Feed/Feed.css';

// Sample data for demonstration purposes
const posts = [
    {
        id: 1,
        username: 'john_doe',
        userImage: 'https://via.placeholder.com/40',
        postImage: 'https://via.placeholder.com/600x400',
        caption: 'Enjoying the sunny day!',
        comments: [
            { username: 'alice', text: 'Looks amazing!' },
            { username: 'bob', text: 'Wish I was there!' },
        ],
    },
    {
        id: 2,
        username: 'jane_smith',
        userImage: 'https://via.placeholder.com/40',
        postImage: 'https://via.placeholder.com/600x400',
        caption: 'Had a great time at the beach!',
        comments: [
            { username: 'carol', text: 'So much fun!' },
            { username: 'dave', text: 'Beautiful place!' },
        ],
    },
];

const Feed = () => {
    return (
        <div className="feed">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    username={post.username}
                    userImage={post.userImage}
                    postImage={post.postImage}
                    caption={post.caption}
                    comments={post.comments}
                />
            ))}
        </div>
    );
};

export default Feed;
