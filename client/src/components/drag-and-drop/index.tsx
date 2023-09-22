import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "JPEG"];

export const DragAndDrop = ({ onUpload }: any) => {
  const handleChange = (file: any) => {
    // onUpload({ source: file });
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}
