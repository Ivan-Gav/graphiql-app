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
import { FieldErrors, useForm } from 'react-hook-form';
import schema, { SchemaSignUp } from '../../utils/yup/schemaValidationSignUp';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../hooks/redux';
import { fetchSignUp } from '../../store/slice/user.slice';
import { useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { useText } from 'src/hooks/useText';
import { T } from 'src/models/models';

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchemaSignUp>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = ({ email, password }: SchemaSignUp) => {
    dispatch(fetchSignUp({ email, password }))
      .unwrap()
      .catch((error: SerializedError) => {
        if (error?.message) {
          setErrorMessage(error.message);
        }
      });
  };

  const T = useText();

  const msg = (key: keyof FieldErrors<SchemaSignUp>) => {
    const fieldErr = errors ? errors[key] : null;
    if (fieldErr && fieldErr.message && T[fieldErr.message as keyof T]) {
      return T[fieldErr.message as keyof T];
    }
    return false;
  };

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
        {T.SIGNUP}
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
              label={T.FIRST_NAME}
              inputProps={{ 'data-testid': 'first-name-input' }}
              autoFocus
              helperText={msg('firstName') || T.FIRST_NAME_PROMPT}
              FormHelperTextProps={{
                sx: {
                  opacity: 0.5,
                  color: `${!!msg('firstName') && '#d9534f'}`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              fullWidth
              id="lastName"
              label={T.LAST_NAME}
              name="lastName"
              inputProps={{ 'data-testid': 'last-name-input' }}
              autoComplete="family-name"
              helperText={msg('lastName') || T.LAST_NAME_PROMPT}
              FormHelperTextProps={{
                sx: {
                  opacity: 0.5,
                  color: `${!!msg('lastName') && '#d9534f'}`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('email')}
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
                  color: `${!!msg('email') && '#d9534f'}`,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('password')}
              fullWidth
              name="password"
              label={T.PASSWORD}
              type="password"
              inputProps={{ 'data-testid': 'password-input' }}
              id="password"
              autoComplete="new-password"
              helperText={msg('password') || T.PASSWORD_PROMPT}
              FormHelperTextProps={{
                sx: {
                  opacity: 0.5,
                  color: `${!!msg('password') && '#d9534f'}`,
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
              label={T.AGREE_TO_SUBSCRIBE}
            />
          </Grid>
        </Grid>
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
          {T.SIGNUP}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/signin" variant="body2">
              {T.SIGNIN_PROMPT}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
