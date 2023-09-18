import { useState } from "react";
import { useIsLoggedIn } from "../../../helpers/useIsLoggedIn";
import {
    CardActions,
    Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Likes = () => {
    const [liked, setLiked] = useState(false);
    const { isLoggedIn } = useIsLoggedIn();

    const handleLikeToggle = () => {
        setLiked(!liked)
    };
    
    return (
        <CardActions className="review-card-actions">
            {isLoggedIn ? (
                <Button
                    className={`review-card-button ${liked ? "liked" : ""}`}
                    size="small"
                    onClick={handleLikeToggle}
                >
                    <FavoriteIcon color={liked ? "error" : "inherit"} />
                </Button>
            ) : (
                <FavoriteIcon color={"inherit"} />
            )}
        </CardActions>
    )
}