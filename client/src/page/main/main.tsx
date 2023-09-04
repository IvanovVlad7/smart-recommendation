import React, { useState } from "react";
import ReviewCard from "../../components/review-cards/review-card";
import TextField from "@mui/material/TextField";
import { Box, Grid, Container} from "@mui/material";
import "./main.css"; 
import Tags from "../../components/tags/tags";

const MainPage = () => {
  const reviews = [
    {
      reviewName: "book",
      targetName: "Office",
      category: "Cinema",
      tags: ['fantastic'],
      reviewText: "2131232423548753284ehskhjzfhkjdshkjfkjhskjdhzkjhfjhkhkjsdhfkjhdkjhfgkjhdkjh",
      imageSource: "dsadas",
      rating: 8, 
    },
  ];


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
        />
      </Box>
      <Grid container spacing={2}>
        {filteredReviews.map((review, index) => (
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