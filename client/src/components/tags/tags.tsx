import React from "react";
import Chip from "@mui/material/Chip";

interface TagsProps {
  tags: string[]; 
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <Chip key={index} label={tag} variant="outlined" color="primary" />
      ))}
    </div>
  );
};

export default Tags;