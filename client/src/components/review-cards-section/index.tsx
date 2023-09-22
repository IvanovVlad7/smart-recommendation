import { Container, Grid } from "@mui/material"
import { ReviewCard } from "../review-cards/review-card"

export const ReviewCardsSection = ({ cards, oldComments, users, likes }: any) => {
    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                {cards?.map((review: any,) => (
                    <Grid item key={review.ID}>
                        <ReviewCard review={review} oldComments={oldComments} users={users} likes={likes} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}