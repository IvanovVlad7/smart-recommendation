import axios from "axios";
import React, { useState } from "react";
import { ReviewForm } from "../../components/review-form/ReviewForm";
import { useCurrentUserData } from "../../helpers/useCurrentUserData";
import { ReviewCardsSection } from "../../components/review-cards-section";

const ApiTest = () => {
    const { isAdmin, userId } = useCurrentUserData();
    const [reviews, setReviews] = useState<any[]>([]);
    const [oldComments, setOldComments] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [likes, setLikes] = useState<any[]>([]);

    const handleGetReviews = async () => {
        try {
            const responseReviews = await axios.get("http://localhost:3001/reviews");
            const responseComments = await axios.get("http://localhost:3001/comments");
            const responseUsers = await axios.get("http://localhost:3001/users");
            const responseLikes = await axios.get("http://localhost:3001/likes");
            setReviews(responseReviews.data?.reviews);
            setOldComments(responseComments.data);
            setUsers(responseUsers.data);
            setLikes(responseLikes.data);
            console.log("Reviews data: ", responseReviews.data);
            console.log("Comments data: ", responseComments.data);
            console.log("Users data: ", responseUsers.data);
            console.log("Likes data: ", responseLikes.data)
        } catch (error) {
            setReviews([]);
            setOldComments([]);
            setUsers([]);
            setLikes([]);
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
        tagText:'book',   
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
        <div style={{ marginTop: 120 }}>
            <>
                <button onClick={handleGetReviews}>GET-Reviews</button>
                <button onClick={handleMockComment}>POST-Comment</button>
                <button onClick={handleMockLike}>POST-Like</button>
                <button onClick={handleAddTag}>POST-Tags</button>
                <button onClick={handleGetTags}>GET-Tags</button>
            </>
            Navigate to my home: <a href={`http://localhost:3003/dashboard/${userId}`}>To Home</a>
            <ReviewForm />
            <ReviewCardsSection 
                cards={reviews}
                oldComments={oldComments}
                users={users}
                likes={likes}
            />
        </div>
    )
}


export default ApiTest;