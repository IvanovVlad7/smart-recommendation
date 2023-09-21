import React, { useEffect, useState } from 'react';
import { FormField } from '../../components/form-field';
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { reviewNameForm, targetNameForm, categoryForm, reviewTextForm, reviewRatingForm } from '../../constans/form-values';
import axios from 'axios';
import './ReviewForm.css';
import { reviewCreateUrl } from '../../constans/api';
import { useTranslation } from 'react-i18next';

export const ReviewForm = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

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

  const { t } = useTranslation();

  useEffect(() => {
    const fetchLastData = async () => {
      const responseCategories = await axios.get("http://localhost:3001/categories");
      const responseTags = await axios.get("http://localhost:3001/tags");
      console.log('responseCategories.data: ', responseCategories.data)
      setCategories(responseCategories.data);
      setTags(responseTags.data);
    };
    fetchLastData()
  }, []);

  return (
    <Container maxWidth="md" className="form-container">
      <Box mt={4}>
        <Typography variant="h5" className="form-title" gutterBottom>
          Create a Review
        </Typography>
        <form onSubmit={handleReviewCreation}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                label={t('ReviewName')}  
                value={formValues.reviewName}
                name={reviewNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewName}
                customErrorMessage={reviewNameForm.required}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <FormField
                label={t('TargetName')}
                value={formValues.targetName}
                name={targetNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.targetName}
                customErrorMessage={targetNameForm.required}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                label={t('Category')}
                value={formValues.category}
                name={categoryForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.category}
                customErrorMessage={categoryForm.required}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label" className="form-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Categories"
                className="form-select"
              >
                {categories.map((category: any) => <MenuItem value={category.categoryText}>{category.categoryText}</MenuItem>)}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label" className="form-label">Tags</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tags"
                className="form-select"
              >
                {tags.map((category: any) => <MenuItem value={category.tagText}>{category.tagText}</MenuItem>)}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormField
                label={t('ReviewText')}
                value={formValues.reviewText}
                name={reviewTextForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewText}
                customErrorMessage={reviewTextForm.required}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                label={t('Rating')}
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
            className="form-button"
          >
            {t('CreateReview')}
          </Button>
        </form>
      </Box>
    </Container>
  );
};