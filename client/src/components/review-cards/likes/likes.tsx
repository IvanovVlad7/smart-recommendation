import { useState } from "react";
import { useCurrentUserData } from "../../../helpers/useCurrentUserData";
import {
    Badge,
    CardActions,
    IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export const Likes = ({ review, reviewAuthor, likes }: any) => {
    const [likesSource, setLikeSource] = useState(likes);
    const { isAdmin, userId } = useCurrentUserData();
    const [amountOfLikes, setAmountOfLikes] = useState(0);
    const filteredLikes = likesSource.filter((like: any) => like.reviewID === review.ID);
    const likeID = filteredLikes.find((like: any) => like.userID === userId)?.ID;
    const [isReviewLiked, setIsReviewLiked] = useState(!!likeID);

    const handleLikeToggle = async () => {
        try {
            if (isReviewLiked) {
                await axios.delete('http://localhost:3001/likes', {
                    data: { likeID }
                });
                setIsReviewLiked(false);
                setAmountOfLikes(prev => prev - 1 || 0);
            } else {
                const response = await axios.post('http://localhost:3001/likes', {
                    reviewID: review.ID,
                    userID: userId
                });
                setLikeSource(response.data.likes);
                setIsReviewLiked(true);
                setAmountOfLikes(prev => prev + 1);  
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <CardActions className="review-card-actions">
            {isAdmin || reviewAuthor ? (
                <>
                    <Badge badgeContent={amountOfLikes} color="error">
                        <IconButton
                            className={`review-card-button ${isReviewLiked ? "liked" : ""}`}
                            size="small"
                            onClick={handleLikeToggle}
                        >
                            <FavoriteIcon color={isReviewLiked ? "error" : "inherit"} />
                        </IconButton>
                    </Badge>
                </>
            ) : (
                <FavoriteIcon color="inherit" />
            )}
        </CardActions>
    )
}