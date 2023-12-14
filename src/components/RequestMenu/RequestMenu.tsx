import React from 'react';
import { Grid, IconButton, Paper } from '@mui/material';
import APIEndpointEditor from './APIEndpointEditor.tsx/APIEndpointEditor';
import HeadersEditor from './HeadersEditor/HeadersEditor';
import VariablesEditor from './VariablesEditor/VariablesEditor';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { requestSlice } from '../../store/reducers/RequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getData } from '../../api/api';

export default function RequestMenu() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector((state) => state.requestReducer);
  const { setRequestInputValue } = requestSlice.actions;

  const handleClickPlay = () => {
    getData(requestInputValue);
  };

  const handleClickClear = () => {
    dispatch(setRequestInputValue(''));
  };

  return (
    <>
      <Paper variant="outlined">
        <Grid container gap={1} justifyContent="space-between">
          <Grid item>
            <IconButton>
              <AutoStoriesRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickPlay}>
              <PlayArrowRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickClear}>
              <CancelPresentationRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 1 }}>
              <APIEndpointEditor />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 1 }}>
              <VariablesEditor />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 1 }}>
              <HeadersEditor />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
