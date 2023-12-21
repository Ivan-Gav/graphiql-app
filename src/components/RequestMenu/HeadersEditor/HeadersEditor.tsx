import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { headersSlice } from 'src/store/slice/HeadersSlice';

export default function HeadersEditor() {
  const dispatch = useAppDispatch();
  const { headersInputValue } = useAppSelector((state) => state.headersReducer);
  const { setHeadersInputValue } = headersSlice.actions;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHeadersInputValue(e.target.value));
  };
  return (
    <>
      <TextField
        label="headers"
        multiline
        maxRows="20"
        value={headersInputValue}
        onChange={handleChange}
        fullWidth
        data-testid="component-input-headers"
      ></TextField>
    </>
  );
}
