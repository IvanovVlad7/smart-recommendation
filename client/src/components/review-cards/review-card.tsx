import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import "./review-card.css";
import { Likes } from "./likes/likes"; 
import { Comments } from "./comments/comments";
import Tags from '../tags/tags';
import { useCurrentUserData } from '../../helpers/useCurrentUserData';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export const ReviewCard = ({ review, oldComments, users, likes }: any) => {
  const { isLoggedIn } = useCurrentUserData();
  const [expanded, setExpanded] = useState(false);
  const arrayOfTags = review?.tags.split(',');
  const exactReviewCommentAuthor = users && isLoggedIn && users.find((user: any) => user.ID === review.userID);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: 250, maxWidth: 500 }}>
      <CardHeader title={review.reviewName} />
      {review?.imageSource ? (
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      ) : null}
      <CardContent>
        <Typography variant="body1" style={{ wordWrap: 'break-word' }} color="text.secondary">
          {review.reviewText}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body1" style={{ wordWrap: 'break-word' }} color="text.secondary">
          Related tags:
        </Typography>
        <Tags tags={arrayOfTags}/>
      </CardContent>
      <CardActions disableSpacing>
        <Likes review={review} reviewAuthor={exactReviewCommentAuthor} likes={likes} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title="Show comments">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Comments review={review} oldComments={oldComments} reviewAuthor={exactReviewCommentAuthor} users={users}/>
        </CardContent>
      </Collapse>
    </Card>
  );
};
