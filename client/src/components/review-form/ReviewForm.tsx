import React, { useEffect, useState } from 'react';
import { FormField } from '../form-field';
import Button from "@mui/material/Button";
import { Card, CardHeader, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Grid ,Rating} from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { reviewNameForm, categoryForm, reviewTextForm, reviewRatingForm, tagsForm, reviewImageSourceForm } from '../../constans/form-values';
import axios from 'axios';
import { reviewCreateUrl } from '../../constans/api';
import { useTranslation } from 'react-i18next';
import { useCurrentUserData } from '../../helpers/useCurrentUserData';
import CloseIcon from '@mui/icons-material/Close';
import { ChipAutocomplete } from '../chip-autocomplete';
import { DragAndDrop } from '../drag-and-drop';

export const ReviewForm = ({ onClose, setIsNewReviewCreated }: any) => {
  const { t } = useTranslation();
  const { userId } = useCurrentUserData();
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const [formValues, setFormValues] = useState({
    [reviewNameForm.name]: "",
    [categoryForm.name]: "",
    [reviewTextForm.name]: "",
    [reviewRatingForm.name]: "0",
    // [reviewImageSourceForm.name]: "",
    [tagsForm.name]: "",
  });
  const [formErrors, setFormErrors] = useState({
    [reviewNameForm.name]: false,
    [categoryForm.name]: false,
    [reviewTextForm.name]: false,
    [reviewRatingForm.name]: false,
    // [reviewImageSourceForm.name]: false,
    [tagsForm.name]: false,
  });

  const handleFormFieldChange = ({ e, name }: any) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleFormTags = ({ tags }: any) => {
    const tagTextArray = tags.map((item: any) => item.tagText).join(', ');
    setFormValues((prev) => ({ ...prev, [tagsForm.name]: tagTextArray }));
  }

  const handleImageSource = ({ source }: any) => {    
    setFormValues((prev) => ({ ...prev, [reviewImageSourceForm.name]: source }));
  }

  const handleReviewCreation = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    const { reviewName, category, reviewText, reviewRating, tags, imageSource } = formValues;
  
    if (!reviewName) setFormErrors((prev) => ({ ...prev, reviewName: true }));
    if (!category) setFormErrors((prev) => ({ ...prev, category: true }));
    if (!reviewText) setFormErrors((prev) => ({ ...prev, reviewText: true }));
    if (!reviewRating) setFormErrors((prev) => ({ ...prev, reviewRating: true }));
    if (!tags) setFormErrors((prev) => ({ ...prev, tagsForm: true }));
    // if (!imageSource) setFormErrors((prev) => ({ ...prev, imageSource: true }));
    if (Object.values(formValues).includes("")) return;

    try {
      await axios.post(reviewCreateUrl, {
        reviewName,
        category,
        reviewText,
        rating: reviewRating,
        userID: userId,
        tags,
        // imageSource: "", // TODO: doesnt work upload
      });
      setIsNewReviewCreated(true);
      onClose?.();
    } catch (error) {
      setIsNewReviewCreated(false);
    }
  };

  useEffect(() => {
    const fetchLastData = async () => {
      try {
        const responseCategories = await axios.get("http://localhost:3001/categories");
        const responseTags = await axios.get("http://localhost:3001/tags");
        console.log('responseCategories.data: ', responseCategories.data)
        setCategories(responseCategories?.data);
        setTags(responseTags?.data);
      } catch (err) {
        console.error(err)
      }

    };
    fetchLastData()
  }, []);

  return (
    <Container>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, boxShadow: 3 }}>
        <CardHeader
          action={
            onClose ? (
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            ) : null
          }
          title={t('CreateReview')}
        />
        <form onSubmit={handleReviewCreation}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label" className="form-label">{t('ReviewName')}</InputLabel>
              <FormField
                value={formValues.reviewName}
                name={reviewNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewName}
                customErrorMessage={reviewNameForm.required}
              />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label" className="form-label">{t('Category')}</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="form-select"
                onChange={(e) => handleFormFieldChange({ e, name: categoryForm.name })}
              >
                {categories.map((category: any) => <MenuItem value={category.categoryText}>{category.categoryText}</MenuItem>)}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label" className="form-label">{t('Tags')}</InputLabel>
              <ChipAutocomplete tags={tags} handleFormTags={handleFormTags}/>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label" className="form-label">{t('ReviewText')}</InputLabel>
              <FormField
                value={formValues.reviewText}
                name={reviewTextForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewText}
                customErrorMessage={reviewTextForm.required}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label" className="form-label">{t('Rating')}</InputLabel>
              <Rating
                name={reviewRatingForm.name}  
                value={parseFloat(formValues[reviewRatingForm.name])} 
                onChange={(event, newValue) => {
                  if (newValue !== null) { 
                    handleFormFieldChange({ e: { target: { value: newValue } }, name: reviewRatingForm.name });
                  }
                }}
                defaultValue={2}
                max={10}
              />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label" className="form-label" sx={{ mb: 1 }}>{t('FileUpload')}</InputLabel>
            <DragAndDrop onUpload={handleImageSource} />
          </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="form-button"
            sx={{ mt: 4 }}
          >
            {t('CreateReview')}
          </Button>
        </form>
      </Card>
    </Container>
  );
};