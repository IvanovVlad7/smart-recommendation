import { useEffect, useState } from "react";
import { useCurrentUserData } from "../../../helpers/useCurrentUserData";
import {
    CardActions,
    Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

export const Likes = ({ review, reviewAuthor, likes }: any) => {
    // TODO: there is a bug when light theme, no likes are visible
    const [liked, setLiked] = useState(false);
    const [likeID, setLikeID] = useState(null);
    const { isAdmin, userId } = useCurrentUserData();
    const [amountOfLikes, setAmountOfLikes] = useState(0);

    const handleLikeToggle = async () => {
        try {
            if (liked && likeID) {
                await axios.delete('http://localhost:3001/likes', {
                    data: { likeID }
                });
                setLiked(false);
                setAmountOfLikes(prev => prev - 1 || 0);
            } else {
                await axios.post('http://localhost:3001/likes', {
                    reviewID: review.ID,
                    userID: userId
                });
                setLiked(true);
                setAmountOfLikes(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const filteredLikes = likes.filter((like: any) => like.reviewID === review.ID);
        const findLike = filteredLikes.find((like: any) => like.userID === userId);
        setAmountOfLikes(filteredLikes.length);
        if (findLike?.ID) {
          setLikeID(findLike.ID);
          setLiked(!!findLike);
        }
        
    }, [likes, review])

    return (
        <CardActions className="review-card-actions">
            {isAdmin || reviewAuthor ? (
                <Button
                    className={`review-card-button ${liked ? "liked" : ""}`}
                    size="small"
                    onClick={handleLikeToggle}
                >
                    <FavoriteIcon color={liked ? "error" : "inherit"} />
                    This Posted is Liked {amountOfLikes} times
                </Button>
            ) : (
                <FavoriteIcon color="inherit" />
            )}
        </CardActions>
    )
}