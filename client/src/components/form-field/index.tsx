import { TextField } from "@mui/material";
import { IFormField } from './form-field-interface';

export const FormField = ({ label, value, onChange, error, customErrorMessage, name }: IFormField) => {
    return (
        <TextField
            label={label}
            size="small"
            margin="normal"
            className="auth-form__input"
            fullWidth={true}
            value={value}
            onChange={(e: any) => onChange({ e, name })}
            required
            error={error}
            helperText={error ? customErrorMessage : ""}
        />
    )
}