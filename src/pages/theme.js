import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/noto-sans';

const DVTheme = createTheme({
  typography: {
    h3: {
      fontSize: '3rem',
      lineHeight: 1.25,
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    h4: {
      fontSize: '2rem',
      lineHeight: 1.25,
      fontWeight: 500,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: 1.25,
      fontWeight: 600,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: '1.6rem',
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
      lineHeight: 1.5,
      fontWeight: 500,
      fontFamily: ['Noto Sans Variable'].join(','),
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
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
