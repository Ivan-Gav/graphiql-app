import { json } from '@codemirror/lang-json';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, Collapse } from '@mui/material';
import ReactCodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
import { useAppDispatch } from 'src/hooks/redux';
import { setHeadersInputValue } from 'src/store/slice/RequestSlice';

export default function HeadersEditor() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('//JSON\n{\n\n}\n');

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
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Headers" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ReactCodeMirror
          lang="json"
          extensions={[json()]}
          minHeight="100px"
          theme="dark"
          width="100%"
          height="100%"
          value={value}
          onChange={onChange}
          style={{ margin: '8px' }}
          data-testid="component-input-headers"
        />
      </Collapse>
    </>
  );
}
