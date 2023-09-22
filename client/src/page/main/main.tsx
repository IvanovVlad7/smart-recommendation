import React, { useState ,useEffect} from "react";
import { Button, Container, Typography} from "@mui/material";
import { getFullReviews } from "../../helpers/requests";
import { ReviewCardsSection } from "../../components/review-cards-section";
import { useCurrentUserData } from "../../helpers/useCurrentUserData";
import { Link } from "react-router-dom";

interface MainProps {
  isDarkTheme: boolean; 
}

const MainPage: React.FC<MainProps> = ({ isDarkTheme }) => {
  const { userId } = useCurrentUserData();
  const [reviews, setReviews] = useState([]);
  const [oldComments, setOldComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  
  const fetchReviews = () => {
    getFullReviews().then((data) => {
        const { fetchedReviews, fetchedComments, fetchedUsers, fetchedLikes } = data;
        setReviews(fetchedReviews);
        setOldComments(fetchedComments);
        setUsers(fetchedUsers);
        setLikes(fetchedLikes);
    });
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return(
    <Container sx={{ py: 8 }} maxWidth="md">
       <Typography variant="h2" align="center" color="primary" sx={{ mb: 10 }}>What review do you like?</Typography>
      {reviews.length ? (
        <ReviewCardsSection 
          cards={reviews}
          oldComments={oldComments}
          users={users}
          likes={likes}
        />
      ) : (
        <div style={{
          display: "flex",
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant="h2" align="center" color="primary">Sorry, no reviews are available</Typography>
          <Button
            sx={{ m: 1, width: 200 }}
            component={Link} 
            to={`dashboard/${userId}`}
            className="menuButton"
            color='success'
            variant='contained'
          >
            Create one
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MainPage

// TODO !important: use real back-end data instead of local reviews
