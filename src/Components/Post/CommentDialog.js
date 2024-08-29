import React, { useState } from 'react';
import { FaPaperPlane, FaRegSmile, FaHeart, FaComment, FaBookmark, FaTimes } from 'react-icons/fa';
import './CommentDialog.css';

const CommentDialog = ({ postImage, comments = [], onClose }) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            console.log('New comment:', newComment);
            setNewComment('');
        }
    };

    return (
        <div className="comment-dialog">
            <button className="close-btn" onClick={onClose}>
                <FaTimes />
            </button>
            <div className="dialog-content">
                <div className="post-image-container">
                    <img src={postImage} alt="Post" className="post-image" />
                </div>
                <div className="comments-section">
                    <div className="comments-list">
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <strong>{comment.username}:</strong> {comment.text}
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                    <div className="post-actions">
                        <FaHeart className="action-icon" />
                        <FaComment className="action-icon" />
                        <FaPaperPlane className="action-icon" />
                        <FaBookmark className="action-icon save-icon" />
                    </div>
                    <form className="comment-form" onSubmit={handleCommentSubmit}>
                        <FaRegSmile className="emoji-icon" />
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentDialog;
