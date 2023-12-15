import { Typography, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import UndoIcon from '@mui/icons-material/Undo';

import { useText } from 'src/hooks/useText';

export default function Page404() {
  const T = useText();

  return (
    <Stack
      component="main"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        marginBottom: 8,
        gap: 3,
      }}
      data-testid="page-404"
    >
      <Typography variant="h2" textAlign="center">
        {T.PAGE_NOT_FOUND}
      </Typography>
      <Typography variant="h4">{T.PAGE_NOT_FOUND_SUBTITLE}</Typography>
      <Typography variant="h6">{T.PAGE_NOT_FOUND_INSTRUCTION}</Typography>
      <Button
        component={NavLink}
        to="/"
        variant="contained"
        size="large"
        endIcon={<UndoIcon />}
        data-testid="btn-home"
        sx={{ width: '100%', opacity: 0.6 }}
      >
        {T.PAGE_NOT_FOUND_BTN}
      </Button>
    </Stack>
  );
}
