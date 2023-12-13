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
import { useText } from 'src/hooks/useText';
import { T } from 'src/models/models';

export default function SignInPage() {
  const T = useText();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SchemaSignIn>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SchemaSignIn) => console.log(data);

  const errMsg = errors?.email?.message;

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
          helperText={(!!errMsg && T[errMsg as keyof T]) || T.EMAIL_PROMPT}
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
          label={T.PASSWORD}
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
