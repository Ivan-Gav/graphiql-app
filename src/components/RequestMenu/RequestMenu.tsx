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

  const addSpaces = (str: string, count: number, space: string) => {
    let row = str.trim();
    for (let i = 0; i < count; i++) {
      if (row !== '') row = space + row;
    }
    row += '\n';

    return row;
  };

  const splitToRows = (str: string) => {
    const arr = [];
    let count = 0;
    let row = '';
    let inParentheses = false;
    const space = '  ';

    for (let i = 0; i < str.length; i++) {
      const el = str[i];
      if (el === '\n' || el === ' ') continue;
      if (el === '}' && !inParentheses) {
        row = addSpaces(row, count, space);
        if (row !== '\n') arr.push(row);
        row = '';

        count--;
        row += el;
        arr.push(addSpaces(row, count, space));
        row = '';
      } else {
        if (el === ')') {
          inParentheses = false;
          row += el;
        } else if (el === '(') {
          inParentheses = true;
          row += el;
        } else if (el === ',') {
          row += el + ' ';
        } else if (el === '{') {
          if (inParentheses) {
            row += el + ' ';
          } else {
            row += ' ' + el;
          }
        } else if (el === '}' && inParentheses) {
          row += ' ' + el;
        } else if (el === ':') {
          row += el + ' ';
        } else row += el;
      }
      if (el === '{' && !inParentheses) {
        arr.push(addSpaces(row, count, space));
        count++;
        row = '';
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
