import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import "./review-card.css";
import { Likes } from "./likes/likes"; 
import { Comments } from "./comments/comments";

const ReviewCard = ({ review, oldComments, users, likes }: any) => {
  const exactReviewCommentAuthor = users && users.find((user: any) => user.ID === review.userID);

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
        <Likes review={review} reviewAuthor={exactReviewCommentAuthor} likes={likes} />
      </CardActions>
      <div className="comment-section">
        <Comments review={review} oldComments={oldComments} reviewAuthor={exactReviewCommentAuthor} />
      </div>
    </Card>
  );
};

export default ReviewCard;

