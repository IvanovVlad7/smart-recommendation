import { useCurrentUserData } from "../../../helpers/useCurrentUserData";
import {
    Button,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";

export const Comments = ({ review, oldComments, users }: any) => {
    const [newComment, setNewComment] = useState("");
    const { isAdmin, userId } = useCurrentUserData();
    console.log('users:', users)
    const handleCommentSubmit = async () => {
        console.log('Submit: ', newComment, review);
        try {
            if (!newComment || !userId || !review.ID) return; 
            const response = await axios.post('http://localhost:3001/comments', {
                reviewID: review.ID,
                commentText: newComment,
                userID: userId
            });
            console.log('response: ', response);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCommentEdit = (index: number) => {
    };

    const handleCommentDelete = (index: number) => {
    };
    console.log('oldComments: ', oldComments)
    return (
        <>
            {oldComments.map((oldComments: any) => {
                <div key={oldComments.ID} className="newComment"></div>
            })}
            {/* {oldComments.map((c: any, index) => (
                <div key={index} className="newComment">
                    {index === editingCommentIndex ? (
                        <div>
                            <TextField
                                label="Edit newComment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleCommentSubmit()}
                            >
                            Save
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <span>{c}</span>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditIcon />}
                                onClick={() => handleCommentEdit(index)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleCommentDelete(index)}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            ))} */}
            {isAdmin ? (
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