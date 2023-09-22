import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export const UserComment = ({ userName, comment }: any) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={userName}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {comment}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider component="li" />
        </>
    );
}