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
import { useTranslation } from 'react-i18next';

export const Dashboard = () => {
    const { t } = useTranslation();
    const { userName } = useCurrentUserData();

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [oldComments, setOldComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [likes, setLikes] = useState([]);
    const [isNewReviewCreated, setIsNewReviewCreated] = useState(false);


    const handleOpenForm = () => {
        setShowReviewForm(!showReviewForm);
    }

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
        if (isNewReviewCreated) {
            fetchReviews();
        }
    }, [isNewReviewCreated])

    useEffect(() => {
        fetchReviews();
    }, []);

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
                    {showReviewForm ? <ReviewForm onClose={handleOpenForm} setIsNewReviewCreated={setIsNewReviewCreated}/> : (
                        <Container maxWidth="sm">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="text.primary"
                                gutterBottom
                            >
                                {userName ?  `${t('Dashboard')}  ${userName}` : t('Dashboard')}
                            </Typography>
                            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                {t('Manage your reviews')}
                            </Typography>
                            <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                            <Button variant="contained" onClick={handleOpenForm}>{t('CreateReview')}</Button>
                            <Button component={Link} variant="outlined" to="/">{t('See each review at the platform')}</Button>
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