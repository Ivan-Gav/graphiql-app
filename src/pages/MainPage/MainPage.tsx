import { Login, PersonAddAlt1 } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/redux';
import { useText } from 'src/hooks/useText';
import { getUser } from 'src/store/slice/user.slice';

export default function MainPage() {
  const { isAuth } = useAppSelector(getUser);
  const T = useText();

  return (
    <Box
      mt="auto"
      sx={{
        padding: {
          xs: 2,
          lg: 0,
        },
      }}
    >
      {!isAuth && (
        <Box maxWidth={520} my={3} mx="auto">
          <Typography textAlign="center" mb={2}>
            {T.HI}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <Button
              component={NavLink}
              sx={{ px: '15px' }}
              to="/signin"
              variant={location.pathname === '/signin' ? 'outlined' : 'text'}
              endIcon={<Login />}
            >
              {T.SIGNIN}
            </Button>
            <Button
              component={NavLink}
              sx={{ px: '15px' }}
              to="/signup"
              variant={location.pathname === '/signup' ? 'outlined' : 'text'}
              endIcon={<PersonAddAlt1 />}
            >
              {T.SIGNUP}
            </Button>
          </Stack>
        </Box>
      )}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: { xs: 'center', sm: 'left', md: 'center', lg: 'left' },
          }}
        >
          <Paper sx={{ padding: { xs: 2, md: 5 }, height: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={12} lg={4} textAlign="center">
                <Link href="https://rs.school/react">
                  <img
                    src="https://www.svgrepo.com/show/424896/react-logo-programming-2.svg"
                    alt="RSS"
                    height={40}
                    style={{ filter: 'invert(85%)' }}
                  />
                </Link>
              </Grid>
              <Grid item xs={12} sm={8} md={12} lg={8}>
                <Typography variant="body1">{T.ABOUT_COURSE}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: { xs: 'center', sm: 'left', md: 'center', lg: 'left' },
          }}
        >
          <Paper sx={{ padding: { xs: 2, md: 5 }, height: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={12} lg={4} textAlign="center">
                <Link href="https://github.com/Ivan-Gav/graphiql-app">
                  <img
                    src="https://www.svgrepo.com/show/394181/graphql.svg"
                    alt="RSS"
                    height={40}
                    style={{ filter: 'invert(85%)' }}
                  />
                </Link>
              </Grid>
              <Grid item xs={12} sm={8} md={12} lg={8}>
                <Typography variant="body1">{T.ABOUT_PROJECT}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
          <Paper sx={{ padding: { xs: 2, md: 5 } }}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Link href="https://github.com/ana-ma-web">
                  <Typography variant="body2" sx={{ display: 'inline' }}>
                    {T.ANASTASIA}
                  </Typography>
                </Link>
                <Typography variant="body1" sx={{ display: 'inline' }}>
                  {T.ABOUT_ANASTASIA}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Link href="https://github.com/cheleste1994">
                  <Typography variant="body2" sx={{ display: 'inline' }}>
                    {T.ANDREY}
                  </Typography>
                </Link>
                <Typography variant="body1" sx={{ display: 'inline' }}>
                  {T.ABOUT_ANDREY}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Link href="https://github.com/ivan-gav">
                  <Typography variant="body2" sx={{ display: 'inline' }}>
                    {T.IVAN}
                  </Typography>
                </Link>
                <Typography variant="body1" sx={{ display: 'inline' }}>
                  {T.ABOUT_IVAN}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
