import { createTheme } from '@mui/material/styles';

const NOTO_SANS_FONT = 'Noto Sans';

const bgColor = '#1b1b1d';
const paperBgColor = '#242526';

const primaryColor = {
  main: '#ba8fff',
  dark: '#7644b5',
  light: '#b97cfd',
};
const secondaryColor = {
  main: '#3578e5',
  dark: '#2d66c3',
  light: '#72a1ed',
};

const textColor = {
  primary: '#e3e3e3',
  secondary: '#fff',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: bgColor,
      paper: paperBgColor,
    },
    text: textColor,
    primary: primaryColor,
    secondary: secondaryColor,
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'text' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            color: textColor.primary,
            '&:hover': {
              color: primaryColor.main,
            },
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: 1600,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: NOTO_SANS_FONT,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: NOTO_SANS_FONT,
          fontWeight: 200,
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            padding: '16px',
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '48px',
            fontWeight: '600',
            textTransform: 'capitalize',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '36px',
            fontWeight: '700',
            textTransform: 'capitalize',
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '24px',
            fontWeight: 700,
            textTransform: 'capitalize',
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '16px',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'h5' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '14px',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'h6' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '13.6px',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'subtitle1' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '16px',
            textTransform: 'capitalize',
            fontWeight: 700,
          },
        },
        {
          props: { variant: 'subtitle2' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '14px',
            fontWeight: 600,
            textTransform: 'uppercase',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '15px',
          },
        },
        {
          props: { variant: 'body2' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '15px',
            fontWeight: 600,
          },
        },
        {
          props: { variant: 'button' },
          style: {
            fontFamily: NOTO_SANS_FONT,
          },
        },
        {
          props: { variant: 'caption' },
          style: {
            fontFamily: NOTO_SANS_FONT,
          },
        },
        {
          props: { variant: 'overline' },
          style: {
            fontFamily: NOTO_SANS_FONT,
          },
        },
        {
          props: { variant: 'inherit' },
          style: {
            fontFamily: NOTO_SANS_FONT,
            fontSize: '15px',
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
            color: primaryColor.main,
          },
        },
      },
    },
  },
});

export default theme;
