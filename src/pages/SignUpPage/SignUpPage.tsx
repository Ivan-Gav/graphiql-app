import {
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from '@mui/material';
import { Box } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import schema, { SchemaSignUp } from '../../utils/yup/schemaValidationSignUp';
import { yupResolver } from '@hookform/resolvers/yup';

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchemaSignUp>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SchemaSignUp) => console.log(data);

  return (
    <Box
      component="main"
      data-testid="sign-up-page"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        marginBottom: 8,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName')}
              autoComplete="given-name"
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              inputProps={{ 'data-testid': 'first-name-input' }}
              autoFocus
              helperText={
                errors?.firstName?.message || 'Please enter your first name'
              }
              FormHelperTextProps={{
                sx: {
                  opacity: 0.5,
                  color: `${!!errors?.firstName?.message && '#d9534f'}`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              inputProps={{ 'data-testid': 'last-name-input' }}
              autoComplete="family-name"
              helperText={
                errors?.lastName?.message || 'Please enter your last name'
              }
              FormHelperTextProps={{
                sx: {
                  opacity: 0.5,
                  color: `${!!errors?.lastName?.message && '#d9534f'}`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('email')}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('password')}
              fullWidth
              name="password"
              label="Password"
              type="password"
              inputProps={{ 'data-testid': 'password-input' }}
              id="password"
              autoComplete="new-password"
              helperText={
                errors?.password?.message || 'Please enter your password'
              }
              FormHelperTextProps={{
                sx: {
                  opacity: 0.5,
                  color: `${!!errors?.password?.message && '#d9534f'}`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('rules')}
                  color="primary"
                  data-testid="rules-input"
                />
              }
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
