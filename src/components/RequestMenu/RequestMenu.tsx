import { Grid, IconButton, Paper } from '@mui/material';
import HeadersEditor from './HeadersEditor/HeadersEditor';
import VariablesEditor from './VariablesEditor/VariablesEditor';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { requestSlice, requestToApi } from '../../store/slice/RequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { prettify } from 'src/utils/prettify';
import APIEndpointEditor from './APIEndpointEditor.tsx/APIEndpointEditor';
import { useText } from 'src/hooks/useText';

export default function RequestMenu() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector((state) => state.requestReducer);
  const { setRequestInputValue } = requestSlice.actions;

  const T = useText();

  const handleClickPlay = () => {
    dispatch(requestToApi({ T }));
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
