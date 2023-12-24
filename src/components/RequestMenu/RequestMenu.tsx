import { Grid, IconButton, Paper } from '@mui/material';
import HeadersEditor from './HeadersEditor/HeadersEditor';
import VariablesEditor from './VariablesEditor/VariablesEditor';
// import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import ArticleIcon from '@mui/icons-material/Article';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import { requestSlice } from '../../store/slice/RequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getData } from '../../api/api';
import { responseSlice } from '../../store/slice/ResponseSlice';
import { prettify } from 'src/utils/prettify';
import { openDocs, closeDocs } from 'src/store/slice/DocSlice';
import { useText } from 'src/hooks/useText';

export default function RequestMenu() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector((state) => state.requestReducer);
  const { setRequestInputValue } = requestSlice.actions;
  const { setResponseInputValue } = responseSlice.actions;

  const { schemaApi } = useAppSelector((state) => state.graphqlReducer);
  const { docsOpen } = useAppSelector((state) => state.docReducer);
  const T = useText();

  const handleCLickDocs = () => {
    dispatch(docsOpen ? closeDocs() : openDocs());
  };

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
            <IconButton
              disabled={!schemaApi}
              onClick={handleCLickDocs}
              title={docsOpen ? T.CLOSE_DOCS : T.OPEN_DOCS}
            >
              {docsOpen ? <DisabledByDefaultRoundedIcon /> : <ArticleIcon />}
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
