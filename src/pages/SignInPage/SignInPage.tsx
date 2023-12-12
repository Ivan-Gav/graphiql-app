import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import schema, { SchemaSignIn } from '../../utils/yup/schemaValidationSignIn';
import { useAppDispatch } from '../../hooks/redux';
import { fetchSignIn } from '../../store/slice/user.slice';
import { useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchemaSignIn>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = ({ email, password }: SchemaSignIn) => {
    dispatch(fetchSignIn({ email, password }))
      .unwrap()
      .catch((error: SerializedError) => {
        if (error?.message) {
          setErrorMessage(error.message);
        }
      });
  };

  return (
    <Box
      component="main"
      data-testid="sign-in-page"
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
          {...register('password')}
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          helperText={errors?.password?.message || 'Please enter your password'}
          FormHelperTextProps={{
            sx: {
              opacity: 0.5,
              color: `${!!errors?.password?.message && '#d9534f'}`,
            },
          }}
        />
        {errorMessage && (
          <Typography
            variant="h6"
            component="h2"
            sx={{ width: 1, opacity: 0.5, color: '#d9534f' }}
          >
            {errorMessage}
          </Typography>
        )}
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
  );
}
