import React, { useState } from 'react';
import { FaHeart, FaComment, FaPaperPlane, FaEllipsisV, FaBookmark } from 'react-icons/fa';
import CommentDialog from '../Post/CommentDialog';
import '../Post/Post.css';

const Post = ({ username, userImage, postImage, caption, comments }) => {
    const [showCommentDialog, setShowCommentDialog] = useState(false);

    const handleCommentClick = () => {
        setShowCommentDialog(true);
    };

    const handleCloseCommentDialog = () => {
        setShowCommentDialog(false);
    };

    return (
        <div className="post">
            <div className="post-header">
                <img src={userImage} alt={`${username}'s profile`} className="user-image" />
                <span className="username">{username}</span>
                <FaEllipsisV className="post-options" />
            </div>
            <img src={postImage} alt="Post" className="post-image" />
            <div className="post-actions">
                <FaHeart className="action-icon" />
                <FaComment className="action-icon" onClick={handleCommentClick} />
                <FaPaperPlane className="action-icon" />
                <FaBookmark className="action-icon save-icon" />
            </div>
            <div className="post-caption">
                <span className="caption">{caption}</span>
            </div>

            {showCommentDialog && (
                <CommentDialog
                    postImage={postImage}
                    comments={comments}
                    onClose={handleCloseCommentDialog}
                />
            )}
        </div>
    );
};

export default Post;
