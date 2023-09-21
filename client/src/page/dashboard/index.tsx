import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCurrentUserData } from '../../helpers/useCurrentUserData';
import { getFullReviews } from '../../helpers/requests';
import { useEffect, useState } from 'react';
import { ReviewCardsSection } from '../../components/review-cards-section';
import { ReviewForm } from '../../components/review-form/ReviewForm';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
    const { userId, userName } = useCurrentUserData();

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [oldComments, setOldComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [likes, setLikes] = useState([]);


    const handleOpenForm = () => {
        setShowReviewForm(!showReviewForm);
    }

    useEffect(() => {
        getFullReviews().then((data) => {
            const { fetchedReviews, fetchedComments, fetchedUsers, fetchedLikes } = data;
            setReviews(fetchedReviews);
            setOldComments(fetchedComments);
            setUsers(fetchedUsers);
            setLikes(fetchedLikes);
        });
    }, [])

    return (
        <>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        mt: 10
                    }}
                >
                    {showReviewForm ? <ReviewForm onClose={handleOpenForm} /> : (
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                {userName ? `Dashboard of ${userName}` : 'Dashboard'}
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                Here you can manage your reviews
                            </Typography>
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                            <Button variant="contained" onClick={handleOpenForm}>Create Review</Button>
                            <Button component={Link} variant="outlined" to="/">See each review at the platform</Button>
                            </Stack>
                        </Container>
                    )}

                   
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <ReviewCardsSection 
                        cards={reviews}
                        oldComments={oldComments}
                        users={users}
                        likes={likes}
                    />
                </Container>
            </main>

        </>
    );
}