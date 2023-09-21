import axios from "axios";

export const getFullReviews = async(): Promise<any> => {
    try {
        const responseReviews = await axios.get("http://localhost:3001/reviews");
        const responseComments = await axios.get("http://localhost:3001/comments");
        const responseUsers = await axios.get("http://localhost:3001/users");
        const responseLikes = await axios.get("http://localhost:3001/likes");
        return {
            fetchedReviews: responseReviews.data.reviews,
            fetchedComments: responseComments.data,
            fetchedUsers: responseUsers.data,
            fetchedLikes: responseLikes.data
        }
    } catch (error) {
        console.error("Error:", error);
        return {
            fetchedReviews: null,
            fetchedComments: null,
            fetchedUsers: null,
            fetchedLikes: null
        }
    }
}