import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchSignOut, getUser } from '../../store/slice/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import LangSelect from '../LangSelect/LangSelect';
import { useText } from 'src/hooks/useText';

export default function Header() {
  const { isAuth } = useAppSelector(getUser);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const T = useText();

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
    <AppBar
      position="sticky"
      sx={{ px: 2, mb: 2, zIndex: 1300 }}
      elevation={scrollTrigger ? 4 : 0}
    >
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
              data-testid={'menu-item-welcome'}
            >
              <Typography
                textAlign="center"
                color={
                  location.pathname === '/' ? 'primary.main' : 'text.primary'
                }
              >
                {T.WELCOME_PAGE}
              </Typography>
            </MenuItem>
            {isAuth && (
              <MenuItem
                onClick={() => {
                  navigate('/graphiql');
                  handleCloseNavMenu();
                }}
                data-testid={'menu-item-graphql'}
              >
                <Typography
                  textAlign="center"
                  color={
                    location.pathname === '/graphiql'
                      ? 'primary.main'
                      : 'text.primary'
                  }
                >
                  {T.GRAPHIQL_PAGE}
                </Typography>
              </MenuItem>
            )}
            <Divider />
            {isAuth && (
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  dispatch(fetchSignOut());
                }}
                data-testid={'menu-item-signout'}
              >
                <Typography textAlign="center">{T.SIGNOUT}</Typography>
              </MenuItem>
            )}
            {!isAuth && (
              <MenuItem
                onClick={() => {
                  navigate('/signin');
                  handleCloseNavMenu();
                }}
                data-testid={'menu-item-signin'}
              >
                <Typography
                  textAlign="center"
                  color={
                    location.pathname === '/signin'
                      ? 'primary.main'
                      : 'text.primary'
                  }
                >
                  {T.SIGNIN}
                </Typography>
              </MenuItem>
            )}
            {!isAuth && (
              <MenuItem
                onClick={() => {
                  navigate('/signup');
                  handleCloseNavMenu();
                }}
                data-testid={'menu-item-signup'}
              >
                <Typography
                  textAlign="center"
                  color={
                    location.pathname === '/signup'
                      ? 'primary.main'
                      : 'text.primary'
                  }
                >
                  {T.SIGNUP}
                </Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link
            component={NavLink}
            to="/"
            px={2}
            color={location.pathname === '/' ? 'primary.main' : 'text.primary'}
          >
            {T.WELCOME_PAGE}
          </Link>
          {isAuth && (
            <Link
              component={NavLink}
              to="/graphiql"
              px={2}
              color={
                location.pathname === '/graphiql'
                  ? 'primary.main'
                  : 'text.primary'
              }
            >
              {T.GRAPHIQL_PAGE}
            </Link>
          )}
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', gap: 16 } }}>
          {isAuth ? (
            <Button
              component={NavLink}
              to="/"
              onClick={() => {
                handleCloseNavMenu();
                dispatch(fetchSignOut());
              }}
              variant="text"
              endIcon={<LogoutIcon />}
            >
              {T.SIGNOUT}
            </Button>
          ) : (
            <>
              <Button
                component={NavLink}
                sx={{ px: '15px' }}
                to="/signin"
                onClick={handleCloseNavMenu}
                variant={location.pathname === '/signin' ? 'outlined' : 'text'}
                endIcon={<Login />}
              >
                {T.SIGNIN}
              </Button>
              <Button
                component={NavLink}
                sx={{ px: '15px' }}
                to="/signup"
                onClick={handleCloseNavMenu}
                variant={location.pathname === '/signup' ? 'outlined' : 'text'}
                endIcon={<PersonAddAlt1 />}
              >
                {T.SIGNUP}
              </Button>
            </>
          )}
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
