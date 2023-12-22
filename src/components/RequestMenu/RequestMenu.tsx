import { Grid, IconButton, Paper } from '@mui/material';
import APIEndpointEditor from './APIEndpointEditor.tsx/APIEndpointEditor';
import HeadersEditor from './HeadersEditor/HeadersEditor';
import VariablesEditor from './VariablesEditor/VariablesEditor';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { requestSlice } from '../../store/slice/RequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getData } from '../../api/api';
import { responseSlice } from '../../store/slice/ResponseSlice';
import { prettify } from 'src/utils/prettify';

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

  const handleClickFormatter = () => {
    dispatch(setRequestInputValue(prettify(requestInputValue)));
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
            <Paper>
              <HeadersEditor />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
