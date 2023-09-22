import { useCurrentUserData } from "../../../helpers/useCurrentUserData";
import {
    IconButton,
    List,
    Paper,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserComment } from "./user-comment";
import SendIcon from '@mui/icons-material/Send';

export const Comments = ({ review, oldComments, reviewAuthor, users }: any) => {
    const [newComment, setNewComment] = useState("");
    const [relevantComments, setRelevantComments] = useState([]);
    const { isAdmin, userId, userName } = useCurrentUserData();
    const handleCommentSubmit = async () => {
        try {
            if (!newComment || !userId || !review.ID) return;
            await axios.post('http://localhost:3001/comments', {
                reviewID: review.ID,
                commentText: newComment,
                userID: userId,
                userName
            });
            const responseComments = await axios.get("http://localhost:3001/comments");
            setNewComment('');
            setRelevantComments(responseComments.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (review.ID && oldComments.length) {
            setRelevantComments(oldComments.filter((comment: any) => comment.reviewID === review.ID))
        }
    }, [review.ID, oldComments]);

    return (
        <>
            {relevantComments.length ? (
                <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {relevantComments.map((comment: any) => 
                            <UserComment
                                userName={comment?.userName}
                                comment={comment.commentText}
                            />
                        )}
                    </List>
                </Paper>
            ) : null}
            {(isAdmin || reviewAuthor?.ID) ? (
                <TextField
                    sx={{ mt: 2 }}
                    label="Leave a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={handleCommentSubmit}
                                disabled={!newComment}
                            >
                                <SendIcon />
                            </IconButton>
                        ),
                    }}
                />
            ) : null}
        </>
    )
};