import React from 'react';
import { Grid, IconButton, Paper } from '@mui/material';
import APIEndpointEditor from './APIEndpointEditor.tsx/APIEndpointEditor';
import HeadersEditor from './HeadersEditor/HeadersEditor';
import VariablesEditor from './VariablesEditor/VariablesEditor';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { requestSlice } from '../../store/reducers/RequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getData } from '../../api/api';
import { responseSlice } from '../../store/reducers/ResponseSlice';

export default function RequestMenu() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector((state) => state.requestReducer);
  const { setRequestInputValue } = requestSlice.actions;
  const { setResponseInputValue } = responseSlice.actions;

  const handleClickPlay = () => {
    getData(requestInputValue)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(
          setResponseInputValue(
            JSON.stringify(JSON.parse(JSON.stringify(data.data)), null, 1)
          )
        );
      });
  };

  const handleClickClear = () => {
    dispatch(setRequestInputValue(''));
  };

  const splitToRows = (str: string) => {
    const arr: string[] = [];
    let count = 0;
    let row = '';
    let inParentheses = false;
    const space = '  ';

    const addRow = (arr: string[], count: number, space: string) => {
      let newRow = row.trim();
      for (let i = 0; i < count; i++) {
        if (newRow !== '') newRow = space + newRow;
      }

      if (newRow !== '') arr.push(newRow + '\n');
      row = '';

      return row;
    };

    for (let i = 0; i < str.length; i++) {
      const el = str[i];
      if (el === '\n') continue;

      if (el === '(') {
        inParentheses = true;
      }
      if (el === ')') {
        inParentheses = false;
      }

      if (el === '}' && !inParentheses) {
        addRow(arr, count, space);

        count--;
        row += el;
        addRow(arr, count, space);
      } else {
        row += el;
      }

      if (el === '{' && !inParentheses) {
        addRow(arr, count, space);
        count++;
      }
    }
    return arr.join('');
  };

  const handleClickFormatter = () => {
    // const str = requestInputValue.replace(/\r?\n/g, '');
    // const strRow = str.replace(/{/g, '{\n').replace(/}/g, '\n}\n');
    // const arr = strRow.split('\n').map((e: string) => (e = e.trim()));
    // arr.map((e) => e.trim());
    // arr.forEach((e) => (e = e.trim()));

    // console.log('handleClickFormatter', arr);
    dispatch(setRequestInputValue(splitToRows(requestInputValue)));
    // console.log('splitToRows', splitToRows(requestInputValue));
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
            <IconButton onClick={handleClickFormatter}>
              <CleaningServicesRoundedIcon />
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
