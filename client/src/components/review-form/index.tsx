import { useState } from 'react';
import { FormField } from '../form-field';
import Button from "@mui/material/Button";
import { reviewNameForm, targetNameForm, categoryForm, reviewTextForm, reviewRatingForm } from '../../constans/form-values';
import axios from 'axios';
import { reviewCreateUrl } from '../../constans/constans';

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
        setFormValues(prev => ({ ...prev, [name]: e.target.value }));
        setFormErrors(prev => ({ ...prev, [name]: false }))
    }

    const handleReviewCreation = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { reviewName, targetName, category, reviewText, reviewRating } = formValues;
    
        if (!reviewName) setFormErrors(prev => ({ ...prev, reviewName: true }))
        if (!targetName) setFormErrors(prev => ({ ...prev, targetName: true }))
        if (!category) setFormErrors(prev => ({ ...prev, category: true }))
        if (!reviewText) setFormErrors(prev => ({ ...prev, reviewText: true }))
        if (!reviewRating) setFormErrors(prev => ({ ...prev, reviewRating: true }))
        if (Object.values(formValues).includes("")) return;

        try {
          const response = await axios.post(reviewCreateUrl, { 
            reviewName,
            targetName,
            category,
            reviewText,
            rating: reviewRating,
            // imageSource: TODO: should be optionally added
            userID: '1' // TODO: shouldn't be hardcoded, should be the actual user's ID
          });
          if (response.data.error) {
            alert(response.data.error);
          }
        } catch (error) {
          console.error("Ошибка:", error);
        }
    };

    return (
        <form>
            <FormField 
                label={reviewNameForm.label}
                value={formValues.reviewName}
                name={reviewNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewName}
                customErrorMessage={reviewNameForm.required}
            />
            <FormField 
                label={targetNameForm.label}
                value={formValues.targetName}
                name={targetNameForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.targetName}
                customErrorMessage={targetNameForm.required}
            />
            <FormField 
                label={categoryForm.label}
                value={formValues.category}
                name={categoryForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.category}
                customErrorMessage={categoryForm.required}
            />
            <FormField 
                label={reviewTextForm.label}
                value={formValues.reviewText}
                name={reviewTextForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewText}
                customErrorMessage={reviewTextForm.required}
            />
            <FormField 
                label={reviewRatingForm.label}
                value={formValues.reviewRating}
                name={reviewRatingForm.name}
                onChange={handleFormFieldChange}
                error={formErrors.reviewRating}
                customErrorMessage={reviewRatingForm.required}
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                sx={{
                    marginTop: 2,
                }}
                onClick={handleReviewCreation}
                >
                Create Review 1
            </Button>
        </form>
    )
};