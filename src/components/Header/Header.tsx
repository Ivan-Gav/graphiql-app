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
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchSignOut, getUser } from '../../store/slice/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export default function Header() {
  const { isAuth } = useAppSelector(getUser);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
              <Typography textAlign="center">Welcome</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/graphiql');
                handleCloseNavMenu();
              }}
            >
              <Typography textAlign="center">GraphiQL</Typography>
            </MenuItem>
            <Divider />
            {isAuth && (
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  dispatch(fetchSignOut());
                }}
              >
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            )}
            {!isAuth && (
              <MenuItem
                onClick={() => {
                  navigate('/signin');
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem>
            )}
            {!isAuth && (
              <MenuItem
                onClick={() => {
                  navigate('/signup');
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Sign Up</Typography>
              </MenuItem>
            )}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link component={NavLink} to="/" px={2}>
            Welcome
          </Link>
          <Link component={NavLink} to="/graphiql" px={2}>
            GraphiQL
          </Link>
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
              SignOut
            </Button>
          ) : (
            <>
              <Button
                component={NavLink}
                to="/signin"
                onClick={handleCloseNavMenu}
                variant="text"
                endIcon={<Login />}
              >
                SignIn
              </Button>
              <Button
                component={NavLink}
                to="/signup"
                onClick={handleCloseNavMenu}
                variant="text"
                endIcon={<PersonAddAlt1 />}
              >
                SignUp
              </Button>
            </>
          )}
        </Box>

        <IconButton
          size="large"
          aria-label="account of current user"
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
