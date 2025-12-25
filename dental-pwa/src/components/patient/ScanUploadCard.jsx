import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
} from '@mui/material';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ScanUploadCard({ onUpload, uploading = false }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main' }} />
          
          <Typography variant="h6" textAlign="center">
            Загрузите КТ-снимок
          </Typography>
          
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Поддерживаются форматы: DICOM, JPG, PNG
          </Typography>

          <input
            accept="image/*,.dcm"
            style={{ display: 'none' }}
            id="scan-upload-file"
            type="file"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          
          <label htmlFor="scan-upload-file" style={{ width: '100%' }}>
            <Button
              variant="outlined"
              component="span"
              fullWidth
              disabled={uploading}
            >
              Выбрать файл
            </Button>
          </label>

          {selectedFile && (
            <Box width="100%">
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <CheckCircleIcon color="success" fontSize="small" />
                <Typography variant="body2">{selectedFile.name}</Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                onClick={handleUpload}
                disabled={uploading}
              >
                Загрузить
              </Button>
            </Box>
          )}

          {uploading && (
            <Box width="100%">
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" textAlign="center" mt={1}>
                Загрузка и обработка снимка...
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
