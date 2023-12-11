import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { Login, PersonAddAlt1 } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import LangSelect from '../LangSelect/LangSelect';
import { T } from '../../constants/text';
import { useLangContext } from '../../context/useLangContext';

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { lang } = useLangContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
  });

  return (
    <AppBar position="sticky" sx={{ px: 2 }} elevation={scrollTrigger ? 4 : 0}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate('/');
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">{T.WELCOME_PAGE[lang]}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/graphiql');
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">
                {T.GRAPHIQL_PAGE[lang]}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                navigate('/signin');
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">{T.SIGNIN[lang]}</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/signup');
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">{T.SIGNUP[lang]}</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link component={NavLink} to="/" px={2}>
            {T.WELCOME_PAGE[lang]}
          </Link>
          <Link component={NavLink} to="/graphiql" px={2}>
            {T.GRAPHIQL_PAGE[lang]}
          </Link>
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', gap: 16 } }}>
          <Button
            component={NavLink}
            to="/signin"
            onClick={handleCloseNavMenu}
            variant="text"
            endIcon={<Login />}
          >
            {T.SIGNIN[lang]}
          </Button>
          <Button
            component={NavLink}
            to="/signup"
            onClick={handleCloseNavMenu}
            variant="text"
            endIcon={<PersonAddAlt1 />}
          >
            {T.SIGNUP[lang]}
          </Button>
        </Box>

        <LangSelect />

        <IconButton
          size="large"
          aria-label="burger menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
