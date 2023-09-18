import React, { useState ,useEffect} from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./review-card.css";
import { Likes } from "./likes";
import { ReviewCardProps } from './review-card-interface';
import { Comments } from "./comments";

const LOCAL_STORAGE_KEY = "reviewData";

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    // TODO: in localstorage only user id and name; 

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setComments(parsedData.comments);
    }
  }, []);

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
        <Likes />
      </CardActions>
      <div className="comment-section">
        <Comments />
      </div>
    </Card>
  );
};

export default ReviewCard;