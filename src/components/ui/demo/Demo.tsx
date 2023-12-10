import React from 'react';
import {
  Button,
  ButtonGroup,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Demo() {
  return (
    <main>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Paper variant="elevation" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button fullWidth variant="contained">
                contained
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined">
                outlined
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth variant="text">
                text
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Button disabled variant="outlined" startIcon={<MenuIcon />}>
                  startIcon
                </Button>
                <Button variant="text" endIcon={<MenuIcon />}>
                  endIcon
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <ButtonGroup
                size="small"
                variant="contained"
                aria-label="outlined primary button group"
                disableRipple
                orientation="vertical"
              >
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Label"
                />
                <FormControlLabel
                  required
                  control={<Switch />}
                  label="Required"
                />
                <FormControlLabel
                  disabled
                  control={<Switch />}
                  label="Disabled"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h1">variant h1</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h2">variant h2</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h3">variant h3</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4">variant h4</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">variant h5</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">variant h6</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">subtitle1</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle2">subtitle2</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">body1</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">body2</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="button">button</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption">caption</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="overline">overline</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="inherit">inherit</Typography>
            </Grid>
            <Grid item xs={3}>
              <Link>Link</Link>
            </Grid>
            <Grid item xs={3}>
              <Link color="inherit" href="#" variant="body1">
                Link
              </Link>
            </Grid>
          </Grid>
        </Paper>
        <Paper variant="elevation" sx={{ p: 1 }}>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Required multiline /TextField"
            multiline
            fullWidth
          />
        </Paper>
      </Stack>
    </main>
  );
}
