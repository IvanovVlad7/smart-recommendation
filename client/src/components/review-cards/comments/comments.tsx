import { useCurrentUserData } from "../../../helpers/useCurrentUserData";
import {
    Button,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserComment } from "./user-comment";

export const Comments = ({ review, oldComments, reviewAuthor }: any) => {
    const [newComment, setNewComment] = useState("");
    const [relevantComments, setRelevantComments] = useState([]);
    const { isAdmin, userId } = useCurrentUserData();

    const handleCommentSubmit = async () => {
        console.log('Submit: ', newComment, review);
        try {
            if (!newComment || !userId || !review.ID) return;
            await axios.post('http://localhost:3001/comments', {
                reviewID: review.ID,
                commentText: newComment,
                userID: userId
            });
            const responseComments = await axios.get("http://localhost:3001/comments");
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

    console.log('reviewAuthor: ', reviewAuthor);
    
    
    return (
        <>
            {relevantComments.map((comment: any) => <div key={comment.ID} className="newComment">
                <UserComment
                    isChangeable={isAdmin || reviewAuthor.ID === userId}
                    userName={reviewAuthor.name}
                    userEmail={reviewAuthor.email}
                    comment={comment.commentText}
                    commentID={comment.ID}
                />
            </div>)}
            {(isAdmin || reviewAuthor?.ID) ? (
                <TextField
                    label="Add a newComment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={handleCommentSubmit}
                        >
                            Comment
                        </Button>
                        ),
                    }}
                />
            ) : null}
        </>
    )
};