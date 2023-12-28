import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { getRequestState } from 'src/store/slice/RequestSlice';
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
  const { responseString, errorMessage } = useAppSelector(getRequestState);

  return (
    <Paper variant="outlined">
      <Typography variant="caption">
        <ReactCodeMirror
          lang="json"
          extensions={[json()]}
          theme={!errorMessage ? 'dark' : myTheme}
          width="100%"
          height="100%"
          value={responseString || errorMessage || ''}
          readOnly
        />
      </Typography>
    </Paper>
  );
}
