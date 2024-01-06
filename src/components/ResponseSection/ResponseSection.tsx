import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Alert, Paper, Snackbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  deleteMessageError as deleteMessageErrorRequest,
  getRequestState,
} from 'src/store/slice/RequestSlice';
import { createTheme } from '@uiw/codemirror-themes';
import { EditorView } from '@codemirror/view';
import {
  deleteMessageError as deleteMessageErrorApi,
  getGraphqlState,
} from 'src/store/slice/graphql.slice';

const scrollStyle = EditorView.theme(
  {
    '.cm-scroller': { overflow: 'auto' },
    '.cm-scroller::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
      backgroundColor: '#242526',
    },
    '.cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: '#7644b5',
      borderRadius: '16px',
      border: '#242526 1px solid',
    },
  },
  { dark: true }
);

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#282c34',
    backgroundImage: '',
    foreground: '#ffd600',
    caret: '#5d00ff',
    selection: '#2c313a',
    selectionMatch: '#036dd626',
    lineHighlight: '#2c313a',
    gutterBackground: '#2c313a',
    gutterForeground: '#ff2121',
  },
  styles: [],
});

export default function ResponseSection() {
  const { responseString, errorMessageApi, errorMessage } =
    useAppSelector(getRequestState);

  const { errorMessage: errorMessageApiUrl } = useAppSelector(getGraphqlState);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(deleteMessageErrorRequest());
    dispatch(deleteMessageErrorApi());
  };

  return (
    <Paper variant="outlined" data-testid="response-section-component">
      <Typography variant="caption">
        <ReactCodeMirror
          lang="json"
          extensions={[json(), scrollStyle]}
          theme={!errorMessageApi ? 'dark' : myTheme}
          width="100%"
          height="100%"
          maxHeight="800px"
          value={responseString || errorMessageApi || ''}
          readOnly
        />
      </Typography>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={errorMessage || errorMessageApiUrl ? true : false}
        onClose={handleClose}
      >
        <Alert severity="error" elevation={6} variant="filled">
          {errorMessage || errorMessageApiUrl}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
