import axios from "axios";
import React, { useState } from "react";
import {ReviewForm} from "../../components/review-form/ReviewForm";
import ReviewCard from "../../components/review-cards/review-card";
import { useCurrentUserData } from "../../helpers/useCurrentUserData";

const ApiTest = () => {
    const { isAdmin } = useCurrentUserData();
    const [reviews, setReviews] = useState<any[]>([]);
    const [oldComments, setOldComments] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    const handleGetReviews = async () => {
        try {
            const responseReviews = await axios.get("http://localhost:3001/reviews");
            const responseComments = await axios.get("http://localhost:3001/comments");
            const responseUsers = await axios.get("http://localhost:3001/users");
            setReviews(responseReviews.data?.reviews);
            setOldComments(responseComments.data);
            setUsers(responseUsers.data)
            console.log("Reviews data:", responseReviews.data);
            console.log("Comments data:", responseComments.data);
            console.log("Users data:", responseUsers.data);
        } catch (error) {
            setReviews([]);
            setOldComments([]);
            setUsers([]);
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
        <div>
            <>
                <button onClick={handleGetReviews}>GET-Reviews</button>
                <button onClick={handleMockComment}>POST-Comment</button>
                <button onClick={handleMockLike}>POST-Like</button>
                <button onClick={handleAddTag}>POST-Tags</button>
                <button onClick={handleGetTags}>GET-Tags</button>
            </>
            <ReviewForm />
            {reviews?.map((review: any) => <ReviewCard review={review} oldComments={oldComments} users={users} />)}
        </div>
    )
}


export default ApiTest;