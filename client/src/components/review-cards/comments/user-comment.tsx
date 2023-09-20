// TODO: make nice UI
// TODO: make 1 API request method (with loader) and share it between component
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export const UserComment = ({ userName, userEmail, comment, isChangeable, commentID }: any) => {
    const [showEditField, setShowEditField] = useState(false);
    const [updatedComment, setUpdatedComment] = useState(comment);
    const [showComment, setShowComment] = useState(comment);
    const [isCommentDeleted, setIsCommentDeleted] = useState(false);

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
        <Card sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            User: {userName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Email: {userEmail}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {isCommentDeleted ? (
                            <Typography variant="body1">
                                Comment deleted.
                            </Typography>
                        ) : showEditField ? (
                            <Input
                                fullWidth
                                placeholder="Update your comment"
                                onChange={handleCommentEdit}
                                value={updatedComment}
                            />
                        ) : (
                            <Typography variant="body1">
                                Comment: {showComment}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                {isChangeable && !isCommentDeleted && (
                    <>
                        <IconButton onClick={handleCommentEnable}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleCommentDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
                {showEditField && (
                    <Button
                        variant="contained"
                        onClick={submitUpdatedComment}
                        size="small"
                    >
                        Save Changes
                    </Button>
                )}
            </CardActions>
        </Card>
    )
};