import { useIsLoggedIn } from "../../../helpers/useIsLoggedIn";
import {
    Button,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export const Comments = () => {
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState("");
    const { isLoggedIn } = useIsLoggedIn();
    const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
        null
    );

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            if (editingCommentIndex !== null) {
                const updatedComments = [...comments];
                updatedComments[editingCommentIndex] = newComment;
                setComments(updatedComments);
                setEditingCommentIndex(null);
            } else {
                setComments([...comments, newComment]);
            }
            setNewComment("");
        }
    };

    const handleCommentEdit = (index: number) => {
        setEditingCommentIndex(index);
        setNewComment(comments[index]);
    };

    const handleCommentDelete = (index: number) => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
    };

    return (
        <>
            {comments.map((c, index) => (
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
            ))}
            {isLoggedIn ? (
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