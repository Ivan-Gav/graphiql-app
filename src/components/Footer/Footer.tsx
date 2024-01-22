import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useText } from 'src/hooks/useText';

export default function Footer() {
  const T = useText();

  return (
    <Box component="footer" sx={{ mx: 0, width: '100%', mt: 'auto' }}>
      <Paper sx={{ mt: 2 }} elevation={0}>
        <Grid container p={1}>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h2" color="text.dark" m={0}>
              {T.THE_TEAM}
            </Typography>
            <Typography
              variant="caption"
              color="text.dark"
              sx={{ display: { md: 'inline', xs: 'none' } }}
            >
              © 2023-2024
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              height="100%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Link
                data-testid="member-gh-link"
                href="https://github.com/ana-ma-web"
                color="primary.dark"
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <GitHubIcon fontSize="small" />
                <Typography variant="body1">{T.ANASTASIA}</Typography>
              </Link>
              <Link
                data-testid="member-gh-link"
                href="https://github.com/cheleste1994"
                color="primary.dark"
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <GitHubIcon fontSize="small" />
                <Typography variant="body1">{T.ANDREY}</Typography>
              </Link>
              <Link
                data-testid="member-gh-link"
                href="https://github.com/ivan-gav"
                color="primary.dark"
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <GitHubIcon fontSize="small" />
                <Typography variant="body1">{T.IVAN}</Typography>
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
            }}
          >
            <Typography variant="h6" color="text.dark" mb={1}>
              {T.FOOTER_PROJECT_TEXT}
            </Typography>
            <Link data-testid="rss-link" href="https://rs.school/react/">
              <img
                src="https://rs.school/images/rs_school.svg"
                alt="RSS"
                height={30}
                style={{ filter: 'invert(45%)' }}
              />
            </Link>
            <Typography variant="subtitle2" color="text.dark">
              RS&nbsp;School react course
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: { md: 'none', xs: 'flex' },
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" color="text.dark">
              © 2023-2024
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
