import axios from "axios";
import React from "react";


const Dashboard = () => {
const handleMockReview = async () => {
    const mockReview = {
      reviewName: "Sport Review",
      targetName: "Sport in My Life",
      category: "Sport",
      reviewText: "This is a review about sports.",
      imageSource: "some_image_url",
      rating: '5',
      userID: '1'
    }
    try {
      const response = await axios.post("http://localhost:3001/reviews", mockReview);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleTest = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reviews");
      console.log("Reviews data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

    const handleMockComment = async () => {
    const mockComment = {
      reviewID: '3',
      commentText: 'Text',
      userID: '1'
    };

    try {
      const response = await axios.post('http://localhost:3001/comments', mockComment);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMockLike = async () => {
    const mockLike = {
      reviewID: '3', 
      userID: '1'
    };

    try {
      const response = await axios.post('http://localhost:3001/likes', mockLike);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleAddTag = async () => {
    const tagData = {
      reviewID: 3, 
      tagText:'detective'
    };

    try {
      const response = await axios.post("http://localhost:3001/tags", tagData);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleGetTags = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tags");
      console.log("Tags data:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return(
    <div>
      <button onClick={handleTest}>GET-Reviews</button>
      <button onClick={handleMockReview}>POST-Review</button>
      <button onClick={handleMockComment}>POST-Comment</button>
      <button onClick={handleMockLike}>POST-Like</button>
      <button onClick={handleAddTag}>POST-Tags</button>
      <button onClick={handleGetTags}>GET-Tags</button>
    </div>
  )
}


export default Dashboard