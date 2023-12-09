import { Typography, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import UndoIcon from '@mui/icons-material/Undo';

export default function Page404() {
  return (
    <main data-testid="page-404">
      <Stack sx={{ width: '40%', margin: '0 auto', gap: 2 }}>
        <Typography variant="h2" textAlign="center">
          Page Not Found
        </Typography>
        <Typography variant="h4">
          We could not find what you were looking for.
        </Typography>
        <Typography variant="h6">
          Please contact the owner of the site that linked you to the original
          URL and let them know their link is broken.
        </Typography>
        <Button
          component={NavLink}
          to="/"
          variant="contained"
          size="large"
          endIcon={<UndoIcon />}
          data-testid="btn-home"
        >
          Home
        </Button>
      </Stack>
    </main>
  );
}
