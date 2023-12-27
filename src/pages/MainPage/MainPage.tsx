// import Demo from '../../components/ui/demo/Demo';
import { Grid, Link, Paper, Typography } from '@mui/material';
import { useText } from 'src/hooks/useText';

export default function MainPage() {
  const T = useText();

  return (
    <>
      <Grid container p={2} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            {T.HI}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
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
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={12} lg={4} textAlign="center">
                    <Link href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md">
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
            <Grid item xs={12} md={12}>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body1">{T.ABOUT_ANASTASIA}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{T.ABOUT_ANDREY}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">{T.ABOUT_IVAN}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
