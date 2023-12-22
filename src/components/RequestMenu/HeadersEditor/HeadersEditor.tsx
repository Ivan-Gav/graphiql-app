import { json } from '@codemirror/lang-json';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, Collapse } from '@mui/material';
import ReactCodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { useCallback, useState } from 'react';
// import { ChangeEvent } from 'react';
// import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
// import { headersSlice } from 'src/store/slice/HeadersSlice';

export default function HeadersEditor() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState('');
  // const dispatch = useAppDispatch();
  // const { headersInputValue } = useAppSelector((state) => state.headersReducer);
  // const { setHeadersInputValue } = headersSlice.actions;
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setHeadersInputValue(e.target.value));
  // };

  const handleClick = () => {
    setOpen(!open);
  };

  const onChange = useCallback((val: string, viewUpdate: ViewUpdate) => {
    setValue(val);
    console.log(viewUpdate.state.doc);
  }, []);

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
