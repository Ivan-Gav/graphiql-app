import { json } from '@codemirror/lang-json';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, Collapse } from '@mui/material';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
import { useAppDispatch } from 'src/hooks/redux';
import { useText } from 'src/hooks/useText';
import { setHeadersInputValue } from 'src/store/slice/RequestSlice';

export default function HeadersEditor() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('//JSON\n{\n\n}\n');

  const T = useText();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const onChange = useCallback(
    (val: string, viewUpdate: ViewUpdate) => {
      setValue(val);

      const newHeadersValue = viewUpdate.state.sliceDoc(
        val.indexOf('{'),
        val.indexOf('}') + 1
      );

      dispatch(setHeadersInputValue(newHeadersValue));
    },
    [dispatch]
  );

  return (
    <>
      <ListItemButton onClick={handleClick} data-testid="component-list-item">
        <ListItemText primary={T.HEADERS} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        data-testid="component-input-headers"
      >
        <CodeMirror
          lang="json"
          extensions={[json()]}
          minHeight="100px"
          theme="dark"
          width="100%"
          height="100%"
          value={value}
          onChange={onChange}
          style={{ margin: '8px' }}
        />
      </Collapse>
    </>
  );
}
