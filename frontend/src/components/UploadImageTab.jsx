// src/components/UploadImageTab.jsx

import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';

const UploadImageTab = ({ onImageSelected, onClose }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const maxSizeMB = 5;

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/jpg': [],
      },
      maxSize: maxSizeMB * 1024 * 1024,
      multiple: false,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          const url = URL.createObjectURL(file);
          setUploadedFile(file); // local state for display
          onImageSelected(url);  // tell parent (cover/content picker)
          onClose();             // close the popover
        }
      },
    });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: 'primary.main',
        borderRadius: '8px',
        p: '1rem',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: isDragActive ? 'action.hover' : 'inherit',
        },
      }}
    >
      <input {...getInputProps()} />
      {!uploadedFile ? (
        <Typography variant="body1">Drag & drop or click to add image</Typography>
      ) : (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">{uploadedFile.name}</Typography>
          <EditOutlinedIcon />
        </Box>
      )}

      {fileRejections.length > 0 && (
        <Typography color="error" variant="caption" mt={1}>
          Only JPG/PNG images under {maxSizeMB}MB are allowed.
        </Typography>
      )}
    </Box>
  );
};

export default UploadImageTab;
