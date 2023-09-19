import { useState } from "react";
import { useCurrentUserData } from "../../../helpers/useCurrentUserData";
import {
    CardActions,
    Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Likes = () => {
    const [liked, setLiked] = useState(false);
    const { isAdmin } = useCurrentUserData();

    const handleLikeToggle = () => {
        setLiked(!liked)
    };
    
    return (
        <CardActions className="review-card-actions">
            {isAdmin ? (
                <Button
                    className={`review-card-button ${liked ? "liked" : ""}`}
                    size="small"
                    onClick={handleLikeToggle}
                >
                    <FavoriteIcon color={liked ? "error" : "inherit"} />
                </Button>
            ) : (
                <FavoriteIcon color="inherit" />
            )}
        </CardActions>
    )
}