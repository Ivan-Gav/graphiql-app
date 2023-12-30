import { ChangeEvent } from 'react';
import { Box, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { requestSlice } from '../../store/slice/RequestSlice';

export default function RequestEditor() {
  const dispatch = useAppDispatch();
  const { requestInputValue, isLoading } = useAppSelector(
    (state) => state.requestReducer
  );
  const { setRequestInputValue } = requestSlice.actions;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRequestInputValue(e.target.value));
  };

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#11111150',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={48} sx={{}} />
        </Box>
      )}
      <TextField
        variant="outlined"
        multiline
        rows={20}
        value={requestInputValue}
        onChange={handleChange}
        fullWidth
        inputProps={{ style: { fontSize: 12, lineHeight: '150%' } }}
        disabled={isLoading}
      />
    </>
  );
}
