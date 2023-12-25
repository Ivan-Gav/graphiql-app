import { Grid, IconButton, Paper } from '@mui/material';
import HeadersEditor from './HeadersEditor/HeadersEditor';
import VariablesEditor from './VariablesEditor/VariablesEditor';
import ArticleIcon from '@mui/icons-material/Article';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import {
  getRequestState,
  requestToApi,
  setRequestInputValue,
} from '../../store/slice/RequestSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { prettify } from 'src/utils/prettify';
import APIEndpointEditor from './APIEndpointEditor.tsx/APIEndpointEditor';
import { openDocs, closeDocs, getDocState } from 'src/store/slice/DocSlice';
import { useText } from 'src/hooks/useText';
import { getGraphqlState } from 'src/store/slice/graphql.slice';

export default function RequestMenu() {
  const dispatch = useAppDispatch();
  const { requestInputValue } = useAppSelector(getRequestState);
  const { schemaApi } = useAppSelector(getGraphqlState);
  const { docsOpen } = useAppSelector(getDocState);

  const T = useText();

  const handleCLickDocs = () => {
    dispatch(docsOpen ? closeDocs() : openDocs());
  };

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
