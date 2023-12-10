import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <Box sx={{ mx: 0, width: '100%', marginTop: 'auto' }}>
      <Paper sx={{ mt: 2 }}>
        <Grid container>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography variant="h2">The Team</Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Box>
              <Link
                href="https://github.com/ana-ma-web"
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <GitHubIcon />
                <Typography variant="subtitle1">Anastasia Mataeva</Typography>
              </Link>
              <Link
                href="https://github.com/cheleste1994"
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <GitHubIcon />
                <Typography variant="subtitle1">Andrei Shamayeu</Typography>
              </Link>
              <Link
                href="https://github.com/ivan-gav"
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <GitHubIcon />
                <Typography variant="subtitle1">Ivan Gavrilin</Typography>
              </Link>
            </Box>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography variant="h4" mb={1}>
              This project was made as part of
            </Typography>
            <Link>
              <img
                src="https://rs.school/images/rs_school.svg"
                alt="RSS"
                height={50}
                style={{ filter: 'invert(85%)' }}
              />
            </Link>
            <Typography variant="subtitle1">
              RS&nbsp;School react course
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              p: 2,
              pt: 0,
            }}
          >
            <Typography variant="caption">© 2023-2024</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
