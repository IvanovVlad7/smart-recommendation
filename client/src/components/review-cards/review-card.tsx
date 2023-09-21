import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Likes } from './likes/likes';
import { Comments } from './comments/comments';
import { Tooltip } from '@mui/material';

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
  const [expanded, setExpanded] = useState(false);
  const exactReviewCommentAuthor = users && users.find((user: any) => user.ID === review.userID);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
        <Typography variant="body2" color="text.secondary">
          {review.reviewText}
        </Typography>
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
          <Comments review={review} oldComments={oldComments} reviewAuthor={exactReviewCommentAuthor} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
