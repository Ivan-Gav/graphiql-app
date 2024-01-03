import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import InputApi from 'src/components/InputApi/InputApi';
import { useText } from 'src/hooks/useText';

export default function APIEndpointEditor() {
  const [open, setOpen] = useState(false);

  const T = useText();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick} data-testid="component-list-item">
        <ListItemText primary={T.API_ENDPOINT} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        data-testid="component-input-variables"
      >
        <InputApi />
      </Collapse>
    </>
  );
}
