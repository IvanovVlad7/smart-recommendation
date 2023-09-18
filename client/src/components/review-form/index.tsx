import { useState } from 'react';
import { FormField } from '../form-field';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { reviewNameForm, targetNameForm, categoryForm, reviewTextForm, reviewRatingForm } from '../../constans/form-values';
import axios from 'axios';
import { reviewCreateUrl } from '../../constans/api';

export const ReviewForm = () => {
  const [formValues, setFormValues] = useState({
    [reviewNameForm.name]: "",
    [targetNameForm.name]: "",
    [categoryForm.name]: "",
    [reviewTextForm.name]: "",
    [reviewRatingForm.name]: "",
  });
  const [formErrors, setFormErrors] = useState({
    [reviewNameForm.name]: false,
    [targetNameForm.name]: false,
    [categoryForm.name]: false,
    [reviewTextForm.name]: false,
    [reviewRatingForm.name]: false,
  });

  const handleFormFieldChange = ({ e, name }: any) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleReviewCreation = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { reviewName, targetName, category, reviewText, reviewRating } = formValues;

    if (!reviewName) setFormErrors((prev) => ({ ...prev, reviewName: true }));
    if (!targetName) setFormErrors((prev) => ({ ...prev, targetName: true }));
    if (!category) setFormErrors((prev) => ({ ...prev, category: true }));
    if (!reviewText) setFormErrors((prev) => ({ ...prev, reviewText: true }));
    if (!reviewRating) setFormErrors((prev) => ({ ...prev, reviewRating: true }));
    if (Object.values(formValues).includes("")) return;

    try {
      const response = await axios.post(reviewCreateUrl, {
        reviewName,
        targetName,
        category,
        reviewText,
        rating: reviewRating,
        userID: '1', // TODO: shouldn't be hardcoded, should be the actual user's ID
      });
      if (response.data.error) {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Create a Review
        </Typography>
        <form onSubmit={handleReviewCreation}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                label={reviewNameForm.label}
                value={formValues.reviewName}
                name={reviewNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewName}
                customErrorMessage={reviewNameForm.required}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label={targetNameForm.label}
                value={formValues.targetName}
                name={targetNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.targetName}
                customErrorMessage={targetNameForm.required}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                label={categoryForm.label}
                value={formValues.category}
                name={categoryForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.category}
                customErrorMessage={categoryForm.required}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                label={reviewTextForm.label}
                value={formValues.reviewText}
                name={reviewTextForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewText}
                customErrorMessage={reviewTextForm.required}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label={reviewRatingForm.label}
                value={formValues.reviewRating}
                name={reviewRatingForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewRating}
                customErrorMessage={reviewRatingForm.required}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Review
          </Button>
        </form>
      </Box>
    </Container>
  );
};