import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function TextSearch({handleInputChange}) {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        display: 'flex',
      }}
    >
      <TextField fullWidth label="Tìm kiếm" id="fullWidth" name='keyword' onChange={(e)=>handleInputChange(e)}/>
      <Button>Tìm kiếm</Button>
    </Box>
  );
}