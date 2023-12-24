import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { getRequestState } from 'src/store/slice/RequestSlice';

export default function ResponseSection() {
  const { responseString, errorMessage } = useAppSelector(getRequestState);

  return (
    <Paper variant="outlined">
      <Typography variant="caption">
        <ReactCodeMirror
          lang="json"
          extensions={[json()]}
          theme="dark"
          width="100%"
          height="100%"
          value={responseString || errorMessage || ''}
          readOnly
        />
      </Typography>
    </Paper>
  );
}
