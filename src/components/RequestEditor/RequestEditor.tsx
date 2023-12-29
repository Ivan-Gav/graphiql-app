import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { requestSlice } from '../../store/slice/RequestSlice';

export default function RequestEditor() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector((state) => state.requestReducer);
  const { setRequestInputValue } = requestSlice.actions;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRequestInputValue(e.target.value));
  };
  return (
    <>
      <TextField
        variant="outlined"
        multiline
        rows={20}
        value={requestInputValue}
        onChange={handleChange}
        fullWidth
        inputProps={{
          sx: [
            {
              fontSize: 12,
              lineHeight: '150%',
              overflow: 'auto',
            },
            {
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
                backgroundColor: '#242526',
              },
            },
            {
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#7644b5',
                borderRadius: '16px',
                border: '#242526 1px solid',
              },
            },
          ],
        }}
      />
    </>
  );
}
