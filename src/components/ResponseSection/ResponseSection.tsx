import ReactCodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Paper } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';

export default function ResponseSection() {
  const { responseString } = useAppSelector((state) => state.responseReducer);

  return (
    <Paper variant="outlined" sx={{ height: '100%', minHeight: '100%' }}>
      <ReactCodeMirror
        lang="json"
        extensions={[json()]}
        theme="dark"
        width="100%"
        height="100%"
        value={responseString}
        readOnly
      />
    </Paper>
  );
}
