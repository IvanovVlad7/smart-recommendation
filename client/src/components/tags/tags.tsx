import React from "react";
import Chip from "@mui/material/Chip";
import { Container, Grid, Stack } from "@mui/material";

interface TagsProps {
  tags: string[]; 
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <Stack direction="row">
      {tags.map((tag) => (
        <Grid item key={tag} sx={{ p: 1 }}>
          <Chip label={tag} variant="outlined" color="primary" />
        </Grid>
      ))}
    </Stack>
  );
};

export default Tags;