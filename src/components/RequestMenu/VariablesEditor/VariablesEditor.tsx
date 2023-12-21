import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { variablesSlice } from 'src/store/slice/VariablesSlice';

export default function VariablesEditor() {
  const dispatch = useAppDispatch();
  const { variablesInputValue } = useAppSelector(
    (state) => state.variablesReducer
  );
  const { setVariablesInputValue } = variablesSlice.actions;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setVariablesInputValue(e.target.value));
  };
  return (
    <>
      <TextField
        label="Variables"
        multiline
        maxRows="20"
        value={variablesInputValue}
        onChange={handleChange}
        fullWidth
      ></TextField>
    </>
  );
}
