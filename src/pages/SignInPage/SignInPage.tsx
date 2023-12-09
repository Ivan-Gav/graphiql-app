import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import schema, { SchemaSignIn } from '../../utils/yup/schemaValidationSignIn';

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchemaSignIn>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SchemaSignIn) => console.log(data);

  return (
    <Container component="main" maxWidth="xs" data-testid="sign-in-page">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register('email')}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            inputProps={{ 'data-testid': 'email-input' }}
            autoComplete="email"
            helperText={errors?.email?.message || 'Please enter your email'}
            FormHelperTextProps={{
              sx: {
                opacity: 0.5,
                color: `${!!errors?.email?.message && '#d9534f'}`,
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
