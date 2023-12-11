import { Typography, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import UndoIcon from '@mui/icons-material/Undo';

export default function Page404() {
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
        Page Not Found
      </Typography>
      <Typography variant="h4">
        We could not find what you were looking for.
      </Typography>
      <Typography variant="h6">
        Please contact the owner of the site that linked you to the original URL
        and let them know their link is broken.
      </Typography>
      <Button
        component={NavLink}
        to="/"
        variant="contained"
        size="large"
        endIcon={<UndoIcon />}
        data-testid="btn-home"
        sx={{ width: '100%', opacity: 0.6 }}
      >
        Home
      </Button>
    </Stack>
  );
}
