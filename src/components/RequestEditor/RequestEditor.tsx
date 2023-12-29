import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getRequestState,
  setRequestInputValue,
} from '../../store/slice/RequestSlice';

export default function RequestEditor() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector(getRequestState);

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
        inputProps={{ style: { fontSize: 12, lineHeight: '150%' } }}
      />
    </>
  );
}
