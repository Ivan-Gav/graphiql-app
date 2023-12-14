import React from 'react';
import { TextField } from '@mui/material';

const defaultString = `{
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
`;

export default function RequestEditor() {
  const handleChange = () => {
    console.log('handleChange');
  };
  return (
    <>
      <TextField
        variant="outlined"
        multiline
        rows={20}
        defaultValue={defaultString}
        onChange={handleChange}
        fullWidth
      />
    </>
  );
}
