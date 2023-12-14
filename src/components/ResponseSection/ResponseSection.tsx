import { Paper } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';

export default function ResponseSection() {
  const { responseString } = useAppSelector((state) => state.responseReducer);

  return (
    <>
      <Paper variant="outlined">{responseString}</Paper>
    </>
  );
}
