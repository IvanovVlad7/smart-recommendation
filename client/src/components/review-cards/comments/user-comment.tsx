// TODO: make nice UI
// TODO: make 1 API request method (with loader) and share it between component
import axios from "axios";
import { useState } from "react";

export const UserComment = ({ userName, userEmail, comment, isChangeable, commentID }: any) => {
    const [showEditField, setShowEditField] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment);
    const [showComment, setShowComment] = useState(comment);
    const [isCommentDeleted, setIsCommentDeleted] = useState(false);

    if (isCommentDeleted) return null;

    const handleCommentEnable = () => {
        setShowEditField(!showEditField)
    };

    const handleCommentEdit = (event: any) => {
        setUpdatedComment(event.target.value)
    };

    const submitUpdatedComment = async () => {
        try {
            if (!commentID || !updatedComment) return;
            await axios.put('http://localhost:3001/comments', {
                commentID,
                comment: updatedComment
            });
            setShowComment(updatedComment)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleCommentDelete = async () => {
        try {
            if (!commentID) return;
            await axios.delete('http://localhost:3001/comments', {
                data: { commentID },
            });
            setIsCommentDeleted(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            User: {userName} |
            Email: {userEmail} |
            Comment: {showComment}
            {isChangeable ? 
                <>
                    <button onClick={() => handleCommentEnable()}>Edit</button>
                    <button onClick={() => handleCommentDelete()}>Delete</button>
                </> 
            : null}
            {showEditField ? 
                <>
                    <input placeholder='Update your comment' onChange={handleCommentEdit} value={updatedComment}/>
                    <button onClick={() => submitUpdatedComment()}>Save Changes</button>
                </> 
            : null}
        </div>
    )
};