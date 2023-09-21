import React, { useState ,useEffect} from "react";
import ReviewCard from "../../components/review-cards/review-card";
import TextField from "@mui/material/TextField";
import { Box, Grid, Container} from "@mui/material";
import axios from "axios";
import "./main.css"; 
import Tags from "../../components/tags/tags";

type Review = {
  reviewName: string;
  targetName: string;
  category: string;
  tags: string[];
  reviewText: string;
  imageSource: string;
  rating: number;
  userID: number;
  ID: number;
};


interface MainProps {
  isDarkTheme: boolean; 
}


const MainPage: React.FC<MainProps> = ({ isDarkTheme }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const getReviewsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reviews");
      console.log(response.data)
      // setReviews(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  

  useEffect(() => {
    getReviewsData()
  }, []);
  
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter((review) =>
    review.reviewName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <Container className="page-container"> 
      <Box className="search-input"> 
        <TextField
            label="Search Reviews"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
          style: {
            color: isDarkTheme ? 'white' : 'black',
            borderColor: isDarkTheme ? 'white' : 'rgba(0, 0, 0, 0.42)', 
            backgroundColor: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'white',
    },
  }}
  InputLabelProps={{
    style: {
      color: isDarkTheme ? 'white' : 'black', 
    },
  }}
          />
      </Box>
      <Grid container spacing={2}>
        {filteredReviews?.map((review, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ReviewCard review={review} />
            <Tags tags={review.tags} />   
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage

// TODO !important: use real back-end data instead of local reviews
