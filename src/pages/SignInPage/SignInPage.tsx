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
import { FieldErrors, useForm } from 'react-hook-form';
import schema, { SchemaSignIn } from '../../utils/yup/schemaValidationSignIn';
import { useAppDispatch } from '../../hooks/redux';
import { fetchSignIn } from '../../store/slice/user.slice';
import { useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { useText } from 'src/hooks/useText';
import { T } from 'src/models/models';

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const T = useText();

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

  const msg = (key: keyof FieldErrors<SchemaSignIn>) => {
    const fieldErr = errors ? errors[key] : null;
    if (fieldErr && fieldErr.message && T[fieldErr.message as keyof T]) {
      return T[fieldErr.message as keyof T];
    }
    return false;
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
        {T.SIGNIN}
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
          label={T.EMAIL_ADDRESS}
          name="email"
          inputProps={{ 'data-testid': 'email-input' }}
          autoComplete="email"
          helperText={msg('email') || T.EMAIL_PROMPT}
          FormHelperTextProps={{
            sx: {
              opacity: 0.5,
              color: `${msg('email') && '#d9534f'}`,
            },
          }}
        />
        <TextField
          {...register('password')}
          margin="normal"
          fullWidth
          name="password"
          inputProps={{ 'data-testid': 'password-input' }}
          label={T.PASSWORD}
          type="password"
          id="password"
          autoComplete="current-password"
          helperText={msg('password') || T.PASSWORD_PROMPT}
          FormHelperTextProps={{
            sx: {
              opacity: 0.5,
              color: `${!!msg('password') && '#d9534f'}`,
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
          {T.SIGNIN}
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/signup" variant="body2">
              {T.SIGNUP_PROMPT}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
