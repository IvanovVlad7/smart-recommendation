import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";

export const ChipAutocomplete = ({ tags, handleFormTags }: any) => {
    const [tagText, setTagText] = useState('');
    const [val, setVal] = useState<any[]>([]);

    const handleNewTagCreation = async () => {
        try {
            await axios.post('http://localhost:3001/tags', { tagText })
            setVal((prev: any) => [...prev, { tagText }])
        } catch (err) {
            console.error(err)
        }
    }

    const handleAutocompleteChange = (e: any, newValue: any) => {
        setVal(newValue)
    }

    useEffect(() => {
        handleFormTags({ tags: val });
    }, [val])

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Autocomplete
                multiple
                id="tags-standard"
                freeSolo
                filterSelectedOptions
                options={tags}
                onChange={handleAutocompleteChange}
                getOptionLabel={(option: any) => option.tagText}
                value={val}
                fullWidth
                disableClearable
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        margin="normal"
                        onChange={(e) => setTagText(e.target.value)}
                        fullWidth
                    />
                )}
                
            />
            <IconButton
                sx={{ p: 2, }}
                onClick={handleNewTagCreation}
                disabled={!tagText}
            >
                <SaveIcon />
            </IconButton>
        </div>
    );
}