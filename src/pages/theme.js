import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/noto-sans';

const DVTheme = createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
      lineHeight: '3.75rem',
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    h2: {
      fontSize: '2.25rem',
      lineHeight: '3rem',
      fontWeight: 800,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    h3: {
      fontSize: '1.75rem',
      lineHeight: '2.25rem',
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
      fontFamily: ['Noto Sans Variable'].join(','),
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: 500,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    button: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 2,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
  },
});

export default DVTheme;
