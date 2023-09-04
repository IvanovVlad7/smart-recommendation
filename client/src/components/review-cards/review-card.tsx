import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./review-card.css";

type Review = {
  reviewName: string;
  targetName: string;
  reviewText: string;
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null
  );

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      if (editingCommentIndex !== null) {
        const updatedComments = [...comments];
        updatedComments[editingCommentIndex] = comment;
        setComments(updatedComments);
        setEditingCommentIndex(null);
      } else {
        setComments([...comments, comment]);
      }
      setComment("");
    }
  };

  const handleCommentEdit = (index: number) => {
    setEditingCommentIndex(index);
    setComment(comments[index]);
  };

  const handleCommentDelete = (index: number) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  return (
    <Card className="review-card">
      <div className="review-card-header">
        <Typography
          className="review-card-title"
          variant="h6"
          component="div"
          gutterBottom
        >
          {review.reviewName}
        </Typography>
        <Typography
          className="review-card-subtitle"
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
        >
          Target: {review.targetName}
        </Typography>
      </div>
      <CardContent className="review-card-content">
        <Typography variant="body2">{review.reviewText}</Typography>
      </CardContent>
      <CardActions className="review-card-actions">
        <Button
          className={`review-card-button ${liked ? "liked" : ""}`}
          size="small"
          onClick={toggleLike}
        >
          <FavoriteIcon color={liked ? "error" : "inherit"} />
        </Button>
        <Button className="review-card-button" size="small">
        
        </Button>
      </CardActions>
      <div className="comment-section">
        {comments.map((c, index) => (
          <div key={index} className="comment">
            {index === editingCommentIndex ? (
              <div>
                <TextField
                  label="Edit comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
        <TextField
          label="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
      </div>
    </Card>
  );
};

export default ReviewCard;