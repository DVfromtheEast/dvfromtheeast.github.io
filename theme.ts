import { createTheme, Theme } from '@mui/material/styles';
import '@fontsource-variable/noto-sans';

const DVTheme: Theme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
      lineHeight: '3.75rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans Variable',
    },
    h2: {
      fontSize: '2.25rem',
      lineHeight: '3rem',
      fontWeight: 800,
      fontFamily: 'Noto Sans Variable',
    },
    h3: {
      fontSize: '1.75rem',
      lineHeight: '2.25rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans Variable',
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      fontWeight: 600,
      fontFamily: 'Noto Sans Variable',
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 600,
      fontFamily: 'Noto Sans Variable',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 600,
      fontFamily: 'Noto Sans Variable',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
      fontFamily: 'Noto Sans Variable',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
      fontFamily: 'Noto Sans Variable',
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 500,
      fontFamily: 'Noto Sans Variable',
    },
    button: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 2,
      fontFamily: 'Noto Sans Variable',
    },
  },
});

export default DVTheme;
