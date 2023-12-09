import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="small" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
