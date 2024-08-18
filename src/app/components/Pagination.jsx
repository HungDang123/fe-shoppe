import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PaginationCpn({totalPages,onPageChange}) {  
  const handlePageChange = (e,page)=>{
    if(onPageChange){
      onPageChange(page);
    }
  }
  return (
    <Stack spacing={2}>
      <Pagination
        count={(totalPages-1)} 
        onChange={handlePageChange} 
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
