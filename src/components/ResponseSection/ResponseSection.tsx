import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Alert, Paper, Snackbar, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  deleteMessageError,
  getRequestState,
} from 'src/store/slice/RequestSlice';
import { createTheme } from '@uiw/codemirror-themes';

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

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(deleteMessageError());
  };

  return (
    <Paper variant="outlined" data-testid="response-section-component">
      <Typography variant="caption">
        <ReactCodeMirror
          lang="json"
          extensions={[json()]}
          theme={!errorMessageApi ? 'dark' : myTheme}
          width="100%"
          height="100%"
          value={responseString || errorMessageApi || ''}
          readOnly
        />
      </Typography>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={errorMessage ? true : false}
        onClose={handleClose}
      >
        <Alert severity="error" elevation={6} variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
